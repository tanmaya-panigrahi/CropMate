import cloudinary from "../config/cloudinary.js";
import fs from "fs";

/**
 * Uploads a file to Cloudinary and returns the secure URL.
 * @param {string} filePath - Path to the local file.
 * @returns {Promise<string>} - URL of uploaded image on Cloudinary.
 */
const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "cropmate", // your Cloudinary folder
    });

    

    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload failed:", error.message);
    throw new Error("Image upload to Cloudinary failed.");
  }
};

export default uploadToCloudinary;
