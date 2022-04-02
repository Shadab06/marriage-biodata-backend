import express from "express"
const router = express.Router();
import { create, get, update, getById, deleteData } from "../controllers/biodata.controller.js"

router.post("/user/create", create)
router.get("/user/get", get);
router.get("/user/get/:id", getById);
router.patch("/user/update/:id", update)
router.delete("/user/delete/:id", deleteData);

export default router