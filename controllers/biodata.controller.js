import Biodata from "../models/biodata.js";

export const create = async (req, res) => {
  const {
    user_id,
    name,
    religion,
    caste,
    dob,
    age,
    height,
    bloodGroup,
    complexion,
    mobile,
    email,
    hobbies,
    timeOfBirth,
    placeOfBirth,
    mangal,
    kuldevak,
    education,
    occupation,
    income,
    fatherName,
    fatherOccupation,
    motherName,
    motherOccupation,
    siblings,
    brother,
    sister,
    address,
    city,
    pincode,
    state,
    profileImage,
    otherImages,
  } = req.body;

  console.log("data", user_id,
  name,
  religion,
  caste,
  dob,
  age,
  height,
  bloodGroup,
  complexion,
  mobile,
  email,
  hobbies,
  timeOfBirth,
  placeOfBirth,
  mangal,
  kuldevak,
  education,
  occupation,
  income,
  fatherName,
  fatherOccupation,
  motherName,
  motherOccupation,
  siblings,
  brother,
  sister,
  address,
  city,
  pincode,
  state,
  profileImage,
  otherImages,);

  let profileImageWeb, otherImagesWeb;
  try {

    if (profileImage) {
      profileImageWeb = "data:image/jpeg;base64," + profileImage;
    }
    if (otherImages) {
      otherImagesWeb = "data:image/jpeg;base64," + otherImages;
    }

    const newData = await Biodata.create({
      user_id,
      name,
      religion,
      caste,
      dob,
      age,
      height,
      bloodGroup,
      complexion,
      mobile,
      email,
      hobbies,
      timeOfBirth,
      placeOfBirth,
      mangal,
      kuldevak,
      education,
      occupation,
      income,
      fatherName,
      fatherOccupation,
      motherName,
      motherOccupation,
      siblings,
      brother,
      sister,
      address,
      city,
      pincode,
      state,
      profileImage,
      otherImages,
      profileImageWeb,
      otherImagesWeb,
    });

    let userDetail = {
      id: newData._id,
    };
    return res.status(201).json(userDetail);
  } catch (error) {
    console.log("error: ", error);
    res.status(422).send(error);
  }
};

export const get = async (req, res) => {
  try {
    const userData = await Biodata.find();
    res.status(200).json(userData);
  } catch (error) {
    res.status(422).send(error);
  }
};

export const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const singleData = await Biodata.findById(id);
    res.status(200).send(singleData);
  } catch (error) {
    console.log("error: ", error);
    res.status(422).send(error);
  }
};

export const update = async (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  let profileImageWeb, otherImagesWeb;
  try {
    if (newData.profileImage)
      profileImageWeb = "data:image/jpeg;base64," + newData.profileImage;

    if (newData.otherImages)
      otherImagesWeb = "data:image/jpeg;base64," + newData.familyImage;

    let dataToUpdate = { ...newData, profileImageWeb, otherImagesWeb };

    const updatedData = await Biodata.findByIdAndUpdate(id, dataToUpdate, {
      new: true,
    });

    res.status(202).json(updatedData);
  } catch (error) {
    res.status(422).send(error);
  }
};

export const deleteData = async (req, res) => {
  const { id } = req.params;
  try {
    await Biodata.findByIdAndRemove(id);

    res.status(200).send({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(422).send(error);
  }
};
