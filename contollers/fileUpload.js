const File = require("../model/file");

//localfileupload ->handler function

exports.localFileUpload = async (req,res)=>{
    try{
        //fetch file
        const file = req.files.file;
        console.log("FILE AAGYI JEE ->",file);

       let path = __dirname + "/files/" + Date.now();

        console.log("PATH->",path);

        file.mv(path,(err)=>{
            console.log(err);
        })
        res.json({
            success:true,
            message:'Local File Upload Successfull',
        })
    }catch(error){

        console.log("Not able to upload the file on server");
        console.log(error);
    }
}