import mongoose from "mongoose";

const Schema = mongoose.Schema;

const billSchema = new Schema({
    date: { type: Date, default: new Date().toLocaleDateString('vi-VN') },
    till: { type: Number },
    bill: { type: Number },
    cash: { type: Number },
    price: { type: Number },
    address: { type: String },
    note: { type: String },
    status: { type: Boolean },
    shipper: { type: Schema.Types.ObjectId, ref: 'shipper' }
}, { timestamps: true });

const BillModel = mongoose.model('bill', billSchema);

export {
    BillModel,
}