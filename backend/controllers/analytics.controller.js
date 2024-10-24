import Order from "../models/order.model.js";
import Product from "../models/Product.model.js";
import User from "../models/user.model.js";

//it's empty cuz this is not the controller itself this is just the fct that we called and we get
export const getAnalyticsData = async () => {
  // this will be diff cz we will using the aggregation pipeline
  //first we will get the total users then the total products then nbr of sales and the revenue (dashboard Analytics)
  const totalUsers = await User.countDocuments();
  const totalProducts = await Product.countDocuments();
  const salesData = await Order.aggregate([
    //fist we need to groupe the data
    {
      $group: {
        _id: null, //groups all the docs together
        totalSales: { $sum: 1 },
        totalRevenue: { $sum: "$totalAmount" },
      },
    },
  ]);
  const { totalSales, totalRevenue } = salesData[0] || {
    totalSales: 0,
    totalRevenue: 0,
  };
  return {
    users: totalUsers,
    Products: totalProducts,
    Sales: totalSales,
    Revenue: totalRevenue,
  };
};
export const getDailySalesData = async (startDate, endDate) => {
  try {
    const dailySalesData = await Order.aggregate([
      //we try to aggregate the orders with the match filter so we say just get the orders in this created at period so if it is greater than the start date and if less than the end date
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      // and we could like to grp them together with the format of year month and date with the field $createdAt then the sales to sum all the orders for each day and and the revenue gonna be the total amount
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          sales: { $sum: 1 },
          revenue: { $sum: "$totalAmount" },
        },
      },
      //and we wil just sort it
      {
        $sort: { _id: 1 },
      },
    ]);
    //example of dailySalesData
    //to see the structure
    //[{_id:"2024-10-18",
    //  sales:10,
    //  revenue:10000.00},
    // }]

    // we need to get the dates as well over the last week in this format["2024-10-15"] instead of writing it manually we will create a fct  to be able to get the dates in this range
    const dateArray = getDatesInRange(startDate, endDate);
    //console.log(dateArray); // we will see[" dates in range..."]

    return dateArray.map((date) => {
      const foundData = dailySalesData.find((item) => item._id === date);
      return {
        date,
        sales: foundData?.sales || 0,
        revenue: foundData?.revenue || 0,
      }; //if no data found for a date then we will add it with 0 sales and 0 revenue
    }); //for each date will run this fct
  } catch (error) {
    throw error;
  }
};

//this function will create an array of dates in the range from start date to end date
function getDatesInRange(startDate, endDate) {
  const dates = [];
  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    dates.push(currentDate.toISOString().split("T")[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}
