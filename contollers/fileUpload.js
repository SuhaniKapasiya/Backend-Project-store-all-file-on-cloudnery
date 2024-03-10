const File = require("../model/file");
const cloudinary = require("cloudinary").v2;

//localfileupload ->handler function

exports.localFileUpload = async (req, res) => {
  try {
    //fetch file from request
    const file = req.files.file;
    console.log("FILE AAGYI JEE ->", file);

    //create path where file need to be stored
    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;

    console.log("PATH->", path);

    //add path to the move function
    //use of mv() -> method is to place the file somewhere on server
    file.mv(path, (err) => {
      console.log(err);
    });

    //create a successful response
    res.json({
      success: true,
      message: "Local File Upload Successfull",
    });
  } catch (error) {
    console.log("Not able to upload the file on server");
    console.log(error);
  }
};

function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder,quality) {
  const options = { folder };
  console.log("temp file path", file.tempFilePath);
  if(quality){
    options.quality = quality;
  }
  options.resource_type ="auto";
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

//image upload ka handler

exports.imageUpload = async (req, res) => {
  try {
    //data fetch
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.imageFile;
    console.log(file);

    //validation
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();
    console.log("File Type", fileType);

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported",
      });
    }

    //file formate supported hai
    console.log("Uploading to Codehelp");
    const response = await uploadFileToCloudinary(file, "codehelp");
    console.log(response);
    //db me entry save krni hai
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "Image Successfully Uploaded",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

exports.videoUpload = async (req,res)=>{

    try{
      //data fetch
      const { name, tags, email } = req.body;
      console.log(name, tags, email);

      const file = req.files.videoFile;

      //validation
      const supportedTypes = ["mp4", "mov"];
      const fileType = file.name.split(".")[1].toLowerCase();
      console.log("FIle Type", fileType);

      //TODO : add a upper limit of 5MB for vedio
      if (!isFileTypeSupported(fileType, supportedTypes)) {
        return res.status(400).json({
          success: false,
          message: "File format not supported",
        });
      }

      //file format supported hai
      console.log("Uploadin to codehelp");
      const response = await uploadFileToCloudinary(file,"Codehelp",);
      console.log(response);

      //db me entry save krni hai
    const fileData = await File.create({
    name,
    tags,
    email,
    imageUrl: response.secure_url,
});

     res.json({
       success: true,
       imageUrl: response.secure_url,
       message: "Video Successfully Uploaded",
     });




    } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  } 
    
}


exports.imageSizeReducer = async (req, res) => {
  try {
    //data fetch
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.imageFile;
    console.log(file);

    //validation
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();
    console.log("File Tyoe", fileType);

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported",
      });
    }

    //file formate supported hai
    console.log("Uploading to Codehelp");
    //TODO height atributes ka use karke compress kare
    const response = await uploadFileToCloudinary(file, "codehelp",90);
    console.log(response);
    //db me entry save krni hai
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "Image Successfully Uploaded",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
