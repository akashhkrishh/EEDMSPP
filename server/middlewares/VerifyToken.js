const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');


const validUser = async (req,res,next) =>{
    const token = req.header('Authorization');
    req.token = token;
    jwt.verify(req.token, process.env.PRIVATE_KEY, async (err, data)=>{
        if(err){
            return res.sendStatus(401);
        }        
        const user = await UserModel.findOne({email:data.email})
        req.user = user;
        next();
    })
    
}

module.exports = {
    validUser,
}