import Biodata from "../models/biodata.js";

export const create = async (req, res) => {
  const {
    user_id,
    manual_id,
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
    aboutUs,
    hobbies,
    expectations,
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
    purchaseId,
    purchaseDate,
    validity,
    profileImage,
    otherImages,
  } = req.body;

  try {
    const newData = await Biodata.create({
      user_id,
      manual_id,
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
      aboutUs,
      hobbies,
      expectations,
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
      purchaseId,
      purchaseDate,
      validity,
      profileImage,
      otherImages,
    });

    let userDetail = {
      manual_id: newData.manual_id,
      id: newData._Id,
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

export const getByManualId = async (req, res) => {
  try {
    const singleData = await Biodata.findOne({
      manual_id: req.params.manual_id,
    });
    res
      .status(200).json(singleData);
  } catch (error) {
    console.log("error: ", error);
    res.status(422).send(error);
  }
};

export const getOne = async (req, res) => {
  const { user_id } = req.params;
  try {
    const singleData = await Biodata.findOne({ user_id });
    return res.status(200).json(singleData);
  } catch (error) {
    console.log("error: ", error);
    res.status(422).send(error);
  }
};

export const update = async (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  let purchaseDate, validity;
  if (newData.purchaseId) {
    purchaseDate = new Date();
    validity = new Date(purchaseDate.getTime() + 2592000000).toUTCString();
  }
  try {
    let dataToUpdate = {
      ...newData,
      purchaseDate,
      validity,
    };

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
