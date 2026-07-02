import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true, 
    unique: true,
    trim  : true, 
},
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  zernioProfileID: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
}); 

export const User = mongoose.model("User", userSchema);
