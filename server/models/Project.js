import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: String,
    firstname: String,
    lastname: String,
    email: String,
    completion: Date,
    description: String
  },
  { timestamps: true }
);

export default mongoose.model("Project", schema);
