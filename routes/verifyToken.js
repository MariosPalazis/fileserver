const JWT = require('jsonwebtoken');
const userModel = require('../model/User');


async function verifyUser(req, res, next){
    const token = req.header('userToken');
    if(!token) return res.status(401).send('Access Denied');

    try{
        const verified = JWT.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }catch(err){
        res.status(400).send('Invalid Token');
    }
}

module.exports.verifyUser = verifyUser;
