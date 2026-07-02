import mongoose from "mongoose"


const accountSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  platform: {type: String, required: true , enum : ["Facebook", "Instagram", "Twitter", "LinkedIn"]},
  username: {type: String, required: true},
  handle: {type: String, required: true},
  profileUrl: {type: String, required: true},
  accessToken: {type: String, required: true},
  refreshToken: {type: String, required: true},
  timestamp: {type: Date, default: Date.now},
  tokenExpiresAt: {type: Date, required: true},
  status: {type: String, required: true, enum: ["active", "inactive", "suspended"], default: "active"},
  avatarUrl: {type: String},
})

export const account = mongoose.model("Account", accountSchema);