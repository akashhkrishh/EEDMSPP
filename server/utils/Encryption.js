const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const FileModel = require('../models/FileModel');
const SendMail = require('./SendMail');

const algorithm = 'aes-256-ctr';

function getKeyFromSecret(secret) {
    return crypto.createHash('sha256').update(secret).digest();
}

const Encryption =  async( req, res ) => {
    try {
        const { ipaddress,keyword, secretkey } = req.body;
        const inputPath = req.file.path;
        const filename = req.file.originalname;


        // const existData = await FileModel.find({owner:req.user, name:(filename+path.extname(inputPath))});
        // if(existData.length !=0){
        //     return res.status(500).json({ message: 'Filename Already Taken.' });
        // }
        const existKeyword = await FileModel.find({keyword:keyword});
        if(existKeyword.length !=0){
            return res.status(500).json({ message: 'Keyword Already Taken.' });
        }
        let isAttacked = 'safe';
        if(ipaddress=='' || ipaddress== null || ipaddress == ' ' || ipaddress.toString() == "undefined"){
            isAttacked = 'corrupted'
        }


        const key = getKeyFromSecret(secretkey);
        const newName = Date.now()+''+path.basename(inputPath);
        const outputPath = 'files/encrypted/'+newName;
        const iv = crypto.randomBytes(16); // 128-bit IV
        const cipher = crypto.createCipheriv(algorithm, key, iv);
        const readStream = fs.createReadStream(inputPath);
        const writeStream = fs.createWriteStream(outputPath);
        writeStream.write(iv); // Prepend IV to the output file
        readStream.pipe(cipher).pipe(writeStream);

        writeStream.on('finish', () => {
            console.log(`File encrypted successfully: ${outputPath}`);
        });
        const originalFile = new FileModel({       
            owner: req.user,
            ipaddress: ipaddress || '0.0.0.0',
            encpath: outputPath,
            isAttacked: isAttacked,
            name: filename,
            extname: path.extname(inputPath),
            type: req.file.mimetype,
            size: req.file.size,
            path: inputPath, 
            keyword:keyword,
            secretkey:secretkey,
        });
        const savedFile = await originalFile.save();
        function hideCharacters(str) {
            if (str.length <= 2) return str;
            const visible = str.substr(-2);
            const hidden = '*'.repeat(str.length - 2);
            return hidden + visible;
        }
        if(ipaddress.toString() == "undefined"){
            return res.status(500).json({ message: 'Corrupted File' });
        }
        SendMail(req.user.name,savedFile.name,hideCharacters(savedFile.secretkey));
        return res.send(savedFile);
    } catch (err) {
        console.log(err)
        console.log('Encryption Failed!');
        res.status(500).json({ message: 'Encryption Failed!' });
    }
}

module.exports = Encryption;