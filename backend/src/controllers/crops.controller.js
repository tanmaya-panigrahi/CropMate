import Crop from "../models/Crop.js";

export const getAllCrops = async (req, res, next) => {
  try {
    const crops = await Crop.find();
    res.json(crops);
  } catch (error) {
    next(error);
  }
};

export const getCropByName = async (req, res, next) => {
  try {
    const crop = await Crop.findOne({ cropName: req.params.name });
    if (!crop) {
      return res.status(404).json({ message: "Crop not found" });
    }
    res.json(crop);
  } catch (error) {
    next(error);
  }
};
