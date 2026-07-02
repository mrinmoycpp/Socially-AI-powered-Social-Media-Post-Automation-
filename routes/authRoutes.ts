import {Router} from "express";
import { registerUser, LoginUser } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", LoginUser);


export default authRouter;