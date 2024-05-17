import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true }
}, {
    timestamps: true
});


const Like = mongoose.models.Like ||mongoose.model('Like', likeSchema);


export default Like;
