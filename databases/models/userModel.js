import mongoose from "mongoose";
import bcrypt from "bcrypt"
const schema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    age: {
      type: Number,
      min: 10,
      max: 70,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    emailVerify: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    pinCode: {
      type: String,
    },
    resetVerified: Boolean,
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

schema.pre("save", function () {
  if (this.password) this.password = bcrypt.hashSync(this.password, 8);
});

export const userModel = mongoose.model("user", schema);
