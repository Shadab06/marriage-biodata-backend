import Biodata from "../models/biodata.js"
import fs from "fs"

export const create = async (req, res) => {
    const { user_id, name, religion, caste, dob, age, height, bloodGroup, complexion, mobile, email, education, occupation, income, fatherName, fatherOccupation, motherName, motherOccupation, siblings, brother, sister, address, district, pincode, state, profileImage, familyImage } = req.body;

    try {

        let profileImageWeb = "data:image/jpeg;base64," + profileImage;
        let familyImageWeb = "data:image/jpeg;base64," + familyImage;

        const newData = await Biodata.create({ user_id, name, religion, caste, dob, age, height, bloodGroup, complexion, mobile, email, education, occupation, income, fatherName, fatherOccupation, motherName, motherOccupation, siblings, brother, sister, address, district, pincode, state, profileImage, familyImage, profileImageWeb, familyImageWeb })

        let userDetail = {
            id: newData._id,
        }
        return res.status(201).json(userDetail);
    } catch (error) {
        console.log("error: ", error)
        res.status(422).send(error)
    }
}

export const get = async (req, res) => {
    try {
        const userData = await Biodata.find();
        res.status(200).json(userData);
    } catch (error) {
        res.status(422).send(error)
    }
}

export const getById = async (req, res) => {
    const { id } = req.params;
    try {
        const singleData = await Biodata.findById(id);
        res.status(200).send(singleData);
    } catch (error) {
        console.log("error: ", error)
        res.status(422).send(error)
    }
}

export const update = async (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    let profileImageWeb, familyImageWeb;
    try {

        if (newData.profileImage)
            profileImageWeb = "data:image/jpeg;base64," + newData.profileImage;

        if (newData.familyImage)
            familyImageWeb = "data:image/jpeg;base64," + newData.familyImage;

        let dataToUpdate = { ...newData, profileImageWeb, familyImageWeb };

        const updatedData = await Biodata.findByIdAndUpdate(id, dataToUpdate, { new: true })

        res.status(202).json(updatedData)
    } catch (error) {
        res.status(422).send(error)
    }
}   