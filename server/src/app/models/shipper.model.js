import mongoose from "mongoose";

const Schema = mongoose.Schema;

const shipperSchema = new Schema({
    name: { type: String },
    birthYear: { type: Number, minLength: 4, maxLength: 4 },
    phoneNumber: { type: Number, minLength: 10, maxLength: 12 },
}, { timestamps: true });

const ShipperModel = mongoose.model('shipper', shipperSchema);

export {
    ShipperModel,
}