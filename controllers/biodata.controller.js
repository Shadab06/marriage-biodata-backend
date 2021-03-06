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
    grandFather,
    grandMother,
    maternalua,
    paternalua,
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
    }

    if (otherImagesBytes) {
      otherImages =
        Math.round(Math.random() * 1000).toString() + "d" + Date.now() + ".jpg";
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
      grandFather,
      grandMother,
      maternalua,
      paternalua,
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
      id: newData._id,
    };

    if (profileImage) {
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

    if (otherImages) {
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
  let newData = req.body;
  try {
    let prevData = await Biodata.findById(id);
    if (prevData?.profileImage && newData?.profileImageBytes?.length > 100) {
      try {
        fs.unlinkSync("files/" + prevData.profileImage);
        console.log("unlink profileImage");
      } catch (error) {
        console.log("Profile image update error: ", error);
      }
    }

    if (prevData?.otherImages && newData.otherImagesBytes?.length > 100) {
      try {
        fs.unlinkSync("files/" + prevData.otherImages);
        console("unlink otherImages");
      } catch (error) {
        console.log("Other images update error: ", error);
      }
    }

    let profileImage, otherImages;

    if (newData?.profileImageBytes?.length > 100) {
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
      newData = { ...newData, profileImage };
    }

    if (newData.otherImagesBytes?.length > 100) {
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
      newData = { ...newData, otherImages };
    }

    const updatedData = await Biodata.findByIdAndUpdate(id, newData, {
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

    try {
      fs.unlinkSync("files/" + deletedData?.profileImage);
    } catch (error) {
      console.log("Profile image delete error: ", error);
    }

    try {
      fs.unlinkSync("files/" + deletedData?.otherImages);
    } catch (error) {
      console.log("Other images delete error: ", error);
    }

    res.status(200).send({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(422).send(error);
  }
};
