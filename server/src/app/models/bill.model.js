import mongoose from "mongoose";

const Schema = mongoose.Schema;

const billSchema = new Schema({
    key: { type: String },
    date: { type: Number, },
    status: { type: Boolean, default: false },
    shipper: { type: Schema.Types.ObjectId, ref: 'shipper', default: null },
    till: { type: Number },
    bill: { type: Number },
    cash: { type: Number },
    price: { type: Number },
    address: { type: String },
    note: { type: String },
}, { timestamps: true });

const BillModel = mongoose.model('bill', billSchema);

export {
    BillModel,
}