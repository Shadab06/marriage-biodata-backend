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
      id: newData._Id
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
    res.status(200).send(singleData);
  } catch (error) {
    console.log("error: ", error);
    res.status(422).send(error);
  }
};

export const getOne = async (req, res) => {
  const { user_id } = req.params;
  console.log(user_id);
  try {
    const singleData = await Biodata.findOne({ user_id });
    res.status(200).send(singleData);
  } catch (error) {
    console.log("error: ", error);
    res.status(422).send(error);
  }
};

export const update = async (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  let profileImageWeb, otherImagesWeb, purchaseDate, validity;
  if (newData.purchaseId) {
    purchaseDate = new Date();
    validity = new Date(purchaseDate.getTime() + 2592000000).toUTCString();
  }
  try {
    if (newData.profileImage)
      profileImageWeb = "data:image/jpeg;base64," + newData.profileImage;

    if (newData.otherImages)
      otherImagesWeb = "data:image/jpeg;base64," + newData.otherImages;

    let dataToUpdate = {
      ...newData,
      profileImageWeb,
      otherImagesWeb,
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
