import express from "express";
const router = express.Router();
import {signup, signin} from "../controllers/user.controller.js"

router.post("/auth/signup", signup)
router.post("/auth/signin", signin)

export default router