import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  created: Date,
  updated: Date
});

export default mongoose.model("User", schema);
