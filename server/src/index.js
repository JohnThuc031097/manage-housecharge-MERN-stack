import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { dbConnect } from "./config/db.js";

const loadDotEnv = dotenv.config();
if (loadDotEnv.error) {
    console.log('[DotENV] => Error: ', loadDotEnv.parsed)
    throw loadDotEnv.error;
}

console.log('[Database] => Connecting ...');
dbConnect(process.env.HOST, process.env.DB)
    .then(() => {
        console.log('[Database] => Connect: OK!');

        return () => {
            const app = express();
            const corsOps = {
                origin: `http://${process.env.HOST}:${process.env.PORT}`,
            }

            app.use(cors(corsOps));
            app.use(express.json());
            app.use(express.urlencoded({ extended: true }));

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
