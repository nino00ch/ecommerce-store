import { stripe } from "../lib/stripe.js";
import Coupon from "../models/coupon.model.js";
import Order from "../models/order.model.js";

export const createCheckoutSession = async (req, res) => {
  try {
    const { products, couponCode } = req.body;
    if (!Array.isArray(products) || products.length === 0) {
      return res
        .status(400)
        .json({ message: "Please provide a valid array of products" });
    }
    // Calculate total price
    let totalAmount = 0; //initialisation

    const lineItems = products.map((product) => {
      const amount = Math.round(product.price * 100); //strip wants u send in the format of cents => 10*100=$1000
      totalAmount += amount * product.quantity;
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: amount,
        },
      };
    });
    //check the coupon code
    let coupon = null;
    if (couponCode) {
      coupon = await Coupon.findOne({
        code: couponCode,
        userId: req.user._id,
        isActive: true,
      });
      if (coupon) {
        totalAmount -= Math.round(
          (totalAmount * coupon.discountPercentage) / 100 //format of cents
        );
      }
    }
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"], //here we can add paypal and alot of methods
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
      discounts: coupon
        ? [
            {
              coupon: await createStripeCoupon(coupon.discountPercentage),
            },
          ]
        : [],
      metadata: {
        userId: req.user._id.toString(),
        couponCode: couponCode || "",
        products: JSON.stringify(
          products.map((p) => ({
            id: p._id,
            price: p.price,
            quantity: p.quantity,
          }))
        ),
      },
    });
    if (totalAmount >= 20000) {
      await createNewCoupon(req.user._id);
    }
    res.status(200).json({ id: session.id, totalAmount: totalAmount / 100 });
  } catch (error) {
    console.error("Error processing checkout:", error.message);
    res
      .status(500)
      .json({ message: "Error processing checkout", error: error.message });
  }
};

export const checkoutSuccess = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      if (session.metadata.couponCode) {
        await Coupon.findOneAndUpdate(
          {
            code: session.metadata.couponCode,
            userId: session.metadata.userId,
          },
          { isActive: false }
        );
      }
      //create a new order
      const products = JSON.parse(session.metadata.products); //convert it to JS objects
      const newOrder = new Order({
        userId: session.metadata.userId,
        products: products.map((product) => ({
          product: product.id,
          quantity: product.quantity,
          price: product.price,
        })),
        totalAmount: session.amount_total / 100, //convert from cents to dollars
        stripSessionId: sessionId,
      });
    }
    await newOrder.save(); //save the new order
    res.json({
      success: true,
      message:
        "Payment successful , order created, and coupon desactivated if used .",
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error("Error processing successful checkout:", error.message);
    res.status(500).json({
      message: "Error processing successful checkout",
      error: error.message,
    });
  }
};

async function createStripeCoupon(discountPercentage) {
  const coupon = await stripe.coupons.create({
    percent_off: discountPercentage,
    duration: "once",
  });
  return coupon.id;
}
async function createNewCoupon(userId) {
  const newCoupon = new coupon({
    code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
    discountPercentage: 10,
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), //30days from now
    userId: userId,
  });
  await newCoupon.save();
  return newCoupon;
}
