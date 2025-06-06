import mongoose from "mongoose";
import { ACCESS_ROLES } from "../modules/admin/admin.types";

const authSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: Object.values(ACCESS_ROLES),
  },
  profilePicture: { type: String, default: null },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Auth", authSchema);
