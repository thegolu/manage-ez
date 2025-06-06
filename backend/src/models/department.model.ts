import mongoose from "mongoose";

const department = new mongoose.Schema({
  code: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Department", department);
