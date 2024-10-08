import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, " Name is required"] },
    email: {
      type: String,
      required: [true, " Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, " Email is required"],
      minLength: [6, " Password must be at least 6 characters"],
    },
    cartItems: [
      {
        quantity: {
          type: Number,
          default: 1,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    //createdAt, updatedAt
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
//password bcrypt
//pre-save hook to hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt); //example password=123456 = 3GD#j3
    next();
  } catch (error) {
    next(error);
  }
});
//jhonne 12345
// 1234567 =>invalid credentials
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

export default User;
