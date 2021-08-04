import express from "express";

// Controllers
import BillController from "../app/controllers/bill.controller.js";
// Midlewares
import { filterExist, filterExists } from "../app/midlewares/bill/filter.midleware.js";

const Router = express.Router();

// GET
Router.get('/bill', BillController['get']);
// POST
Router.post('/bill/add', filterExist, BillController['add']);
// POST
Router.post('/bill/upload-file', filterExists, BillController['uploadFile']);

export default Router;