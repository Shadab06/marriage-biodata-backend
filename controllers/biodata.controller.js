import Biodata from "../models/biodata.js";
import fs from "fs";
import moment from "moment";

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
    purchase_id,
    reg_date,
    flag,
    profileImageBytes,
    otherImagesBytes,
  } = req.body;

  try {
    let purchase = new Date();
    let purchase_date = moment(new Date()).format("DD/MM/YYYY");
    let makeValDate = new Date(purchase.getTime() + 3600000);
    let validity = moment(makeValDate).format("DD/MM/YYYY");

    let profileImage, otherImages;

    if (profileImageBytes) {
      profileImage =
        Math.round(Math.random() * 1000).toString() + "d" + Date.now() + ".jpg";

      fs.writeFile(
        "files/" + profileImage,
        profileImageBytes,
        "base64",
        (error) => {
          if (error) {
            console.log("data", error);
          }
        }
      );
    }

    if (otherImagesBytes) {
      otherImages =
        Math.round(Math.random() * 1000).toString() + "d" + Date.now() + ".jpg";

      fs.writeFile(
        "files/" + otherImages,
        otherImagesBytes,
        "base64",
        (error) => {
          if (error) {
            console.log("data", error);
          }
        }
      );
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
      reg_date,
      purchase_id,
      purchase_date,
      validity,
      flag,
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
    res.status(200).json(singleData);
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
  let dataToUpdate = { newData };
  try {
    let profileImage, otherImages;

    if (newData?.profileImageBytes) {
      profileImage =
        Math.round(Math.random() * 1000).toString() + "d" + Date.now() + ".jpg";

      fs.writeFile(
        "files/" + profileImage,
        newData.profileImageBytes,
        "base64",
        (error) => {
          if (error) {
            console.log("data", error);
          }
        }
      );
      dataToUpdate = { ...dataToUpdate, profileImage };
    }

    if (newData?.otherImagesBytes) {
      otherImages =
        Math.round(Math.random() * 1000).toString() + "d" + Date.now() + ".jpg";

      fs.writeFile(
        "files/" + otherImages,
        newData.otherImagesBytes,
        "base64",
        (error) => {
          if (error) {
            console.log("data", error);
          }
        }
      );
      dataToUpdate = { ...dataToUpdate, otherImages };
    }

    const updatedData = await Biodata.findByIdAndUpdate(id, dataToUpdate, {
      new: true,
    });

    res.status(202).json(updatedData);
  } catch (error) {
    res.status(422).send(error);
    console.log(error);
  }
};

export const deleteData = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedData = await Biodata.findOneAndRemove({ _id: id });
    // const deletedData = await Biodata.findOneAndRemove(id);

    try {
      fs.unlinkSync("files/" + deletedData?.profileImage);
    } catch (error) {
      console.log("Profile image error: ", error);
    }

    try {
      fs.unlinkSync("files/" + deletedData?.otherImages);
    } catch (error) {
      console.log("Other images error: ", error);
    }

    res.status(200).send({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(422).send(error);
  }
};
