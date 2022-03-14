import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express()
app.use(cors());
app.use(express.json({ limit: "50mb", extended: true }));

import userRouters from "./routers/user.router.js";
import biodataRouters from "./routers/biodata.router.js";

app.use("/api", userRouters);
app.use("/api", biodataRouters);

const PORT = process.env.SERVER_PORT || 2001;

mongoose.connect(process.env.MONGODB_CONNECTION_URL, { useNewUrlParser: true })
    .then(() => app.listen(PORT, () => console.log(`Successfully connected to ${PORT}`)))
    .catch((error) => console.log("error: ", error));
