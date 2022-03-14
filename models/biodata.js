import mongoose from "mongoose";

const Schema = mongoose.Schema;

const biodataSchema = new mongoose.Schema(
    {
        user_id: {
            type: String,
            required: true,
            trim: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        religion: {
            type: String,
            required: false,
            trim: true
        },
        caste: {
            type: String,
            required: false,
            trim: true
        },
        dob: {
            type: String,
            required: false,
            trim: true
        },
        age: {
            type: String,
            required: true,
            trim: true
        },
        height: {
            type: String,
            required: false,
            trim: true
        },
        bloodGroup: {
            type: String,
            required: false,
            trim: true
        },
        complexion: {
            type: String,
            required: false,
            trim: true
        },
        mobile: {
            type: String,
            required: false,
            trim: true
        },
        email: {
            type: String,
            required: false,
            trim: true
        },
        education: {
            type: String,
            required: true,
            trim: true
        },
        occupation: {
            type: String,
            required: false,
            trim: true
        },
        income: {
            type: String,
            required: false,
            trim: true
        },
        fatherName: {
            type: String,
            required: true,
            trim: true
        },
        fatherOccupation: {
            type: String,
            required: false,
            trim: true
        },
        motherName: {
            type: String,
            required: false,
            trim: true
        },
        motherOccupation: {
            type: String,
            required: false,
            trim: true
        },
        siblings: {
            type: String,
            required: false,
            trim: true
        },
        brother: {
            type: String,
            required: false,
        },
        sister: {
            type: String,
            required: false,
        },
        address: {
            type: String,
            required: true,
            trim: true
        },
        district: {
            type: String,
            required: false,
            trim: true
        },
        pincode: {
            type: String,
            required: false,
            trim: true
        },
        state: {
            type: String,
            required: false,
            trim: true
        },
        profileImage: {
            type: String,
            required: false,
            trim: true
        },
        familyImage: {
            type: String,
            required: false,
            trim: true
        },
        profileImageWeb: {
            type: String,
            required: false,
            trim: true
        },
        familyImageWeb: {
            type: String,
            required: false,
            trim: true
        }
    }
)

export default mongoose.model("Biodata", biodataSchema);