import express from "express";

// Controllers
import BillController from "../app/controllers/bill.controller.js";
// Midlewares
import { filterExist, filterExists } from "../app/midlewares/filter.midleware.js";

const Router = express.Router();

// GET
Router.get('/', BillController['get']);
// POST
Router.post('/add', filterExist, BillController['add']);
// POST
Router.post('/upload-file', filterExists, BillController['uploadFile']);

export default Router;