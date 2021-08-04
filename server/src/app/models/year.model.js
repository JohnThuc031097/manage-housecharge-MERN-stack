import mongoose from "mongoose";

const Schema = mongoose.Schema;

const YearSchema = new Schema({
    key: { type: Number },
}, { timestamps: true });

const YearModel = mongoose.model('year', YearSchema);

export {
    YearModel,
}