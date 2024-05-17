import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    propertyType: { type: String, required: true, enum: ['Apartment', 'House', 'Villa', 'Plot', 'Commercial'] },
    location: {
        city: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: Number, required: true },
        address: { type: String, required: true },
    },
    area: { type: Number, required: true }, // in square feet
    numBedrooms: { type: Number, required: true },
    numBathrooms: { type: Number, required: true },
    furnishingStatus: { type: String, enum: ['Unfurnished', 'Semi-Furnished', 'Fully-Furnished'] },
    amenities: [{ type: String }], // e.g., 'Swimming Pool', 'Parking', 'Gym'
    nearbyHospitals: [String],
    nearbySchools: [String],
    nearbyColleges: [String],
    price: { type: Number, required: true },
    availableFrom: { type: Date, required: true },
    images: [{ type: String }],
    otherDetails: { type: String },
    likeCount: { type: Number, default: 0 },
    interestedBuyers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, {
    timestamps: true
});

const Property = mongoose.models.Property || mongoose.model('Property', propertySchema)

export default Property;
