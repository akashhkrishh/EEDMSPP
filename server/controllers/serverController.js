const FileModel = require('../models/FileModel');
const AttackFileModel = require('../models/AttackFileModel');
const UserModel = require('../models/UserModel');
const fs = require('fs')

exports.attacklist = async(req, res) =>{
    try {
        
        const AttackList = await AttackFileModel.find().populate('file');
        res.send(AttackList)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error.' });
    }
} 

exports.allfilelist = async(req, res) =>{
    try {
        
        const AllList = await FileModel.find().populate('owner');
        res.send(AllList)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error.' });
    }
} 

exports.userlist = async(req, res) =>{
    try {
        
        const UserList = await UserModel.find();
        res.send(UserList)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error.' });
    }
} 
exports.count = async(req, res) =>{
    try {
        
        const safeFile = await FileModel.find({isAttacked:'safe'});
        const attackedFile = await FileModel.find({isAttacked:'attacked'});
        const corruptedFile = await FileModel.find({isAttacked:'corrupted'});

        res.send({count:[0,safeFile.length,corruptedFile.length,attackedFile.length,0]})

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error.' });
    }
} 