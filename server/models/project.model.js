// models/project.model.js
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  priority: { type: String, enum: ["LOW", "MEDIUM", "HIGH"], default: "MEDIUM" },
  status: { type: String, enum: ["ACTIVE", "PLANNING", "COMPLETED", "ON_HOLD", "CANCELLED"], default: "ACTIVE" },
  start_date: Date,
  end_date: Date,
  progress: { type: Number, default: 0 },
  team_lead: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  workspaceId: { type: mongoose.Schema.Types.ObjectId, ref: "Workspace", required: true },
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);
