import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    email: String
  },
  { timestamps: true }
);

export default mongoose.model("Contact", schema);
