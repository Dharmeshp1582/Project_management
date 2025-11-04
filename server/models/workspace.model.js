// models/workspace.model.js
import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  settings: { type: Object, default: {} },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  image_url: { type: String, default: "" },
}, { timestamps: true });

export default mongoose.model("Workspace", workspaceSchema);
