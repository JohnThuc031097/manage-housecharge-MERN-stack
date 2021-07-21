import express from "express";
import BillController from "../app/controllers/bill.controller.js";

const Router = express.Router();

// GET
Router.get('/', BillController['index']);
// POST
Router.post('/', BillController['add']);

export default Router;