const router = require('express').Router();
const userModel = require('../model/User');
const {registerValidation, loginValidation} =require('../validation');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

router.post("/register", async (req,res)=>{
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //check user existance
    const emailexists = await userModel.findOne({email: req.body.email});
    if(emailexists) return res.status(400).send("Email already exists");

    //hash password
    bcrypt.hash(req.body.password, 10, async function(err, hash) {
        const User = new userModel({
            email: req.body.email,
            password: hash
        });
        console.log(User);
        try{
            const saveduser = await User.save();

            const token = JWT.sign({_id: saveduser._id}, process.env.TOKEN_SECRET);
            res.status(200).send({
                token: token
            });
        }catch(err){
            res.status(400).send(err)
        }
    });


    
});

//LOGIN
router.post("/login", async (req,res)=>{
    console.log("iss");
    //validate data
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //check user existance
    const user = await userModel.findOne({email: req.body.email});
    if(!user) return res.status(400).send("Wrong Username / Password");

    //check password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Wrong Username / Password');

    //assign token
    const token = JWT.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.send({
        token: token,
        user: {
            email: user.email,
        }
    });
})

module.exports = router;
