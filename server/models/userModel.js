import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minLength: 8,
      required: true,
    },
    name: {
      type: String,
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.matchPassword = async function (enterdPassword) {
  return await bcrypt.compare(enterdPassword, this.password);
};

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", UserSchema);

export default User;
