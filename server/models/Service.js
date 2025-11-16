import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    fullDesc: {
        type: String,
        required: true
    },
    img: {
        type: String,
        default: '/images/img1.png'
    },
    features: {
        type: [String],
        default: []
    },
}, { timestamps: true });

export default mongoose.model("Service", serviceSchema);
