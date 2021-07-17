import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import { dbConnect } from "./config/db.js";

const loadDotEnv = dotenv.config();
if (loadDotEnv.error) {
    console.log('[DotENV] => Error: ', loadDotEnv.parsed)
    throw loadDotEnv.error;
}

console.log('[Database] => Connecting ...');
dbConnect(process.env.DB_HOST, process.env.DB_PORT, process.env.DB_COLLECTION)
    .then(() => {
        console.log('[Database] => Connected');

        return () => {
            const app = express();
            const corsOps = {
                origin: `http://${process.env.HOST}:${process.env.PORT}`,
            }

            app.use(cors(corsOps));
            app.use(express.json());
            app.use(express.urlencoded({ extended: true }));
            app.use(morgan('dev'));

            app.listen(process.env.PORT, () => {
                console.log(`Server API start: http://${process.env.HOST}:${process.env.PORT}`);
            });
        }
    })
    .catch((err) => {
        console.log('[Database] => Connect: FAILED!');
        console.log(`[Database] => Error: ${err}`);
        process.exit();
    });
