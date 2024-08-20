import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: 'dgrgfbvyr',
  api_key: '678523126882245',
  api_secret: '508eVnOBV6SbmhTlH3_nFxgDAus'
});

export const fileUploadToCloudinary = async (filePath) => {

  
  try {
    if (!filePath) {
      return null;
    }

    const uploadResult = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    console.log("file uploaded successfully");
    console.log("result = ", uploadResult.url); // this is url where image
    // is stored in cloudinary

    // unlinkg file from locl storage
    // fs.unlinkSync(filePath)

    return uploadResult; // bohot sara data as a rwsposne send kia
    // so it is on us which part to choose
  } catch (error) {
    console.log(error);
    fs.unlinkSync(filePath);
    return null;
  }
};

