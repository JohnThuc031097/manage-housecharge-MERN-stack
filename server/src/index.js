import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
// Import App
import { dbConnect } from "./config/db.js";
import Routes from "./routes/index.route.js";

// Load .ENV
const loadDotEnv = dotenv.config();
if (loadDotEnv.error) {
    console.log('[DotENV] => Error: ', loadDotEnv.parsed)
    throw loadDotEnv.error;
}
// Connect database
console.log('[Database] => Connecting ...');
const connectDB = dbConnect(process.env.DB_HOST, process.env.DB_PORT, process.env.DB_COLLECTION)
if (connectDB) {
    console.log('[Database] => Connected');
    // Config App
    const app = express();
    const corsOps = {
        origin: `http://${process.env.HOST}:${process.env.PORT}`,
    }
    app.use(cors(corsOps));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan('dev'));

    // Config Routes
    Routes(app);

    app.listen(process.env.PORT, () => {
        console.log(`Server API start: http://${process.env.HOST}:${process.env.PORT}`);
    });
} else {
    process.exit();

}
