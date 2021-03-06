import mongoose from "mongoose";

const Schema = mongoose.Schema;

const biodataSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
      trim: true,
    },
    manual_id: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    religion: {
      type: String,
      required: false,
      trim: true,
    },
    caste: {
      type: String,
      required: false,
      trim: true,
    },
    dob: {
      type: String,
      required: false,
      trim: true,
    },
    age: {
      type: String,
      required: false,
      trim: true,
    },
    height: {
      type: String,
      required: false,
      trim: true,
    },
    bloodGroup: {
      type: String,
      required: false,
      trim: true,
    },
    complexion: {
      type: String,
      required: false,
      trim: true,
    },
    mobile: {
      type: String,
      required: false,
      trim: true,
    },
    email: {
      type: String,
      required: false,
      trim: true,
    },
    aboutUs: {
      type: String,
      required: false,
      trim: true,
    },
    hobbies: {
      type: String,
      required: false,
      trim: true,
    },
    expectations: {
      type: String,
      required: false,
      trim: true,
    },
    timeOfBirth: {
      type: String,
      required: false,
      trim: true,
    },
    placeOfBirth: {
      type: String,
      required: false,
      trim: true,
    },
    mangal: {
      type: String,
      required: false,
      trim: true,
    },
    kuldevak: {
      type: String,
      required: false,
      trim: true,
    },
    education: {
      type: String,
      required: false,
      trim: true,
    },
    occupation: {
      type: String,
      required: false,
      trim: true,
    },
    income: {
      type: String,
      required: false,
      trim: true,
    },
    fatherName: {
      type: String,
      required: false,
      trim: true,
    },
    grandFather: {
      type: String,
      trim: true
    },
    grandMother: {
      type: String,
      trim: true
    },
    maternalua: {
      type: String,
      trim: true
    },
    paternalua: {
      type: String,
      trim: true
    },
    fatherOccupation: {
      type: String,
      required: false,
      trim: true,
    },
    motherName: {
      type: String,
      required: false,
      trim: true,
    },
    motherOccupation: {
      type: String,
      required: false,
      trim: true,
    },
    siblings: {
      type: String,
      required: false,
      trim: true,
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
      required: false,
      trim: true,
    },
    city: {
      type: String,
      required: false,
      trim: true,
    },
    pincode: {
      type: String,
      required: false,
      trim: true,
    },
    state: {
      type: String,
      required: false,
      trim: true,
    },
    purchase_id: {
      type: String,
      required: false,
      trim: true,
    },
    reg_date: {
      type: String,
      required: false,
      trim: true,
    },
    purchase_date: {
      type: String,
      required: false,
    },
    validity: {
      type: String,
    },
    flag: {
      type: Number,
      default: 0,
      required: false
    },
    profileImage: {
      type: String,
      required: false,
      trim: true,
    },
    otherImages: {
      type: String,
      required: false,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Biodata", biodataSchema);
