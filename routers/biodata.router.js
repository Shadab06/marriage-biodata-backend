import express from "express"
const router = express.Router();
import { create, get, update, getByManualId, deleteData, getOne } from "../controllers/biodata.controller.js"

router.post("/user/create", create)
router.get("/user/get", get);
router.get("/user/get/:manual_id", getByManualId);
router.get("/user/getOne/:user_id", getOne)
router.patch("/user/update/:id", update)
router.delete("/user/delete/:id", deleteData);

export default router