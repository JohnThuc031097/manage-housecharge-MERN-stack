import express from "express";

// Controllers
import YearController from "../app/controllers/year.controller.js";
// Midlewares
import { filterExist } from "../app/midlewares/year/filter.midleware.js";

const Router = express.Router();

// GET
Router.get('/year', YearController['get']);
// POST
Router.post('/year/add', filterExist, YearController['add']);

export default Router;