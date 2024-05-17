import mongoose from "mongoose";

const interestSchema = new mongoose.Schema({
    buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true }
}, {
    timestamps: true
});

const Interest = mongoose.models.Interest || mongoose.model('Interest', interestSchema)

export default Interest;
