const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs  = require('fs');


const UserModel = require('../models/UserModel');
const AttackFileModel = require('../models/AttackFileModel');
const FileModel = require('../models/FileModel');
const Encryption = require('../utils/Encryption');
const Decryption = require('../utils/Decryption');
const SendMail = require('../utils/SendMail');


exports.register = async(req, res) =>{
    
    try {
        const { name, username, email, gender, place, pincode, phone ,password } = req.body;
        const existingEmail = await UserModel.findOne({ email });
        const existingUsername = await UserModel.findOne({ username });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email is already taken.' });
        }
        if (existingUsername) {
            return res.status(400).json({ message: 'Username is already taken.' });
        }
        const hashpassword = await bcrypt.hash(password,10);
        const newUser = new UserModel({
                name: name,
                username:username,
                email: email,
                gender: gender,
                phone: phone,
                place: place,
                pincode: pincode,
                password: hashpassword,
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

    } catch(error) {
        console.log(error);
        return res.status(500).json({ error: error});
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await UserModel.findOne({ email });
        if (!existingUser) {
            return res.status(401).json({ message: 'Invalid Email or password.' });
        }
        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid name or password.'});
        }
        const token = jwt.sign({ email:existingUser.email, username:existingUser.username}, process.env.PRIVATE_KEY);
        res.status(200).json({ token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error.' });
    }
};


exports.fileUpload = async (req, res) =>{
    try {
        Encryption(req, res);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error.' });
    }
}; 

exports.decrypt = async (req, res) =>{
    try {
        
        Decryption(req,res)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error.' });
    }
}; 

exports.fileContent  = async (req, res) =>{
    try {
       const { fileid } = req.body;
       const fileData = await FileModel.findById(fileid);
       const fileContent = fs.readFileSync(fileData.encpath, 'hex');
       res.status(200).json({fileContent});
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error.' });
    }
}; 

exports.myfiles = async(req, res) =>{
    try {
        
        const AllList = await FileModel.find({owner:req.user._id});
        res.send(AllList)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error.' });
    }
} 
exports.attackfiles = async(req, res) =>{
    try {
        
        const { fileid } = req.body;
        const AllList = await AttackFileModel.find({file:fileid}).populate('file');
        res.send(AllList[0])

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error.' });
    }
} 
exports.myfilesize = async(req, res) =>{
    try {
        const AllList = await FileModel.find({owner:req.user._id});
        let count = 0;
        for(let i=0;i<AllList.length;i++){
            count = Number(count)+ Number(AllList[i].size);
        }
        res.send({count})

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error.' });
    }
} 

exports.myfileData = async(req, res) =>{
    try {
        const AllList = await FileModel.find({owner:req.user._id});
        let fileSize = [];
        let fileName = [];
        for(let i=0;i<AllList.length;i++){
            fileName.push(AllList[i].name);
            fileSize.push((Number(AllList[i].size)/1024).toFixed(4));
        }
        res.send({fileName:fileName, fileSize:fileSize})

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error.' });
    }
} 
