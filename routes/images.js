const router = require('express').Router();
const uploadModel = require('../model/Uploads');
const multer = require('multer');
const path = require('path');
const JWT = require('jsonwebtoken');
const userModel = require('../model/User');
const {verifyUser} = require('./verifyToken');

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null,'Images');
    },
    filename:(req,file,cb)=>{
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({storage:storage});

router.post("/uploadimage",verifyUser, upload.single('image'), async (req,res)=>{    
    const token = req.header('userToken');
    const verified = JWT.verify(token, process.env.TOKEN_SECRET);
    console.log(req.body);
    const uploads = new uploadModel({
        imagepath: req.file.filename,
        tag: req.body.tag,
        timestamp: req.body.timestamp,
        location: JSON.parse(req.body.location),
        userid: verified._id
    });
    console.log(uploads);
    try{
        const saved = await uploads.save();
        res.status(200).send({
            "status": "success"
        });
    }catch(error){
        res.status(500).send({
            "status": "Error"
        });
    }
    
});

router.get("/", (req,res)=>{
    res.sendStatus(200);
});

module.exports = router;