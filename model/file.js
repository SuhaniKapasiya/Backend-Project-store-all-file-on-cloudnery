const mongoose =require("mongoose");

const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String
    }
});

//Post middleware

fileSchema.post("save",async function(doc){
    try{

        console.log("DOC",doc);
        //TODO shift this configuration  under /config folder
        //transporter
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                 user:process.env.MAIL_USER,
                 pass:process.env.MAIL_PASS,
            },
        })
        //send mail
        let info = await transporter.sendMail({
          from: "Codehelp - by Babbar",
          to: doc.email,
          subject: "New File Uploaded  on Cloudinary",
          html: `<h2>HEllo JEE </h2> <p>FIle Uploaded View here:<a href="${doc.imageUrl}">${doc.imageUrl}</a></p>`,
        });

        console.log("INFO",info);

    }catch(error){
        console.log(error);
    }
})

const File = mongoose.model("File",fileSchema);
module.exports = File;