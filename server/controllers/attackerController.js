
const FileModel = require('../models/FileModel');
const AttackFileModel = require('../models/AttackFileModel');
const UserModel = require('../models/UserModel');
const fs = require('fs');
const ASendMail = require('../utils/AttackMail');

exports.search = async(req, res) =>{
    try {
        const { keyword, username } = req.body;
        const existingUser = await UserModel.find({username:username});
        if(existingUser.length == 0){
            return res.status(404).json({ message: 'Owner name Not Found' });
         }
        console.log(existingUser[0])
        const existingData = await FileModel.find({keyword:keyword,owner:existingUser[0]._id,isAttacked:'safe'});
        if(existingData.length == 0){
           return res.status(404).json({ message: 'Keyword Not Found' });
        }
        const fileContent = fs.readFileSync(existingData[0].encpath, 'hex');
        res.send({fileid:existingData[0]._id,fileContent:fileContent,filename:existingData[0].name })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error.' });
    }
    
}

exports.attack = async(req, res) =>{
    try {
        const { fileid, hackername, message, ipaddress } = req.body;
        const existingData = await FileModel.findByIdAndUpdate(fileid,{isAttacked:'attacked'},{new:true});
        const existingAttack = await AttackFileModel.find({file:fileid});
        if(existingAttack != 0){
            return res.status(404).json({ message: 'File Already Attacked' });
         }
        const newAttack = new AttackFileModel({
            ipaddress:ipaddress,
            file:fileid,
            hackername: hackername,
            message: message,
        });
        ASendMail(hackername,existingData.name,ipaddress)
        const AttackFile = await newAttack.save();
        res.send(AttackFile);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error.' });
    }
    
}