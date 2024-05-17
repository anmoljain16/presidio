import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                // Simple email validation regex
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    phoneNumber: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                // Simple phone number validation regex
                return /^\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    password: { type: String, required: true },
    userType: { type: String, enum: ['buyer', 'seller'], required: true },

}, {
    timestamps: true
});


const User = mongoose.models.User || mongoose.model('User',userSchema)

export default User;
