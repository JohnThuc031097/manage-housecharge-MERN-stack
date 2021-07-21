import express from "express";
import BillController from "../app/controllers/bill.controller.js";

const Router = express.Router();

// GET
Router.get('/', BillController['get']);
// POST
Router.post('/upload', BillController['upload']);

export default Router;