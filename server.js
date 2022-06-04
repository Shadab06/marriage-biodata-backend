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
app.use("/files", express.static("files"));

const PORT = process.env.SERVER_PORT || 2001;

mongoose.connect(
    // "mongodb://localhost:27017"
    // process.env.MONGODB_CONNECTION_URL_DEV
    process.env.MONGODB_CONNECTION_URL
    , { useNewUrlParser: true }, (error) => {
    if (error) {
        console.log("Error is: " + error)
    } else {
        console.log("Mongodb connected.")
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})
