const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const FileModel = require('../models/FileModel')

const algorithm = 'aes-256-ctr';

function getKeyFromSecret(secret) {
    return crypto.createHash('sha256').update(secret).digest();
}

const Decryption =  async( req, res ) => {
    try {
        const { fileid, secretkey } = req.body;
        const fileData = await FileModel.findById(fileid).populate('owner');
        if(fileData.secretkey.toString() != secretkey.toString()){
            return res.status(500).json({ message: 'Invaild Secret Key.' });
        }
        const inputPath = fileData.encpath;
        const newName = Date.now()+''+path.basename(inputPath);
        const outputPath = 'files/decrypted/'+newName;

        const key = getKeyFromSecret(secretkey);
        const readStream = fs.createReadStream(inputPath);
        let iv = Buffer.alloc(16);
        readStream.once('data', (chunk) => {
          iv = chunk.slice(0, 16); // Extract IV from the input file
          const decipher = crypto.createDecipheriv(algorithm, key, iv);
          const remainingStream = fs.createReadStream(inputPath, { start: 16 });
          remainingStream.pipe(decipher).pipe(fs.createWriteStream(outputPath));
          remainingStream.on('end', async () => {
            console.log(`File decrypted successfully: ${outputPath}`);
             fs.readFile(outputPath, 'utf8', async(err, data) => {
                if (err) {
                    console.error('Error reading file:', err);
                    return res.status(500).json({ message: 'File Read Error' });;
                }
                return res.send({type:fileData.type ,name:fileData.name,filepath:outputPath})
            });
            
          });
        });
    } catch (err) {
        console.log(err)
        console.log('Encryption Failed!');
        return res.status(500).json({ message: 'Server error.' });
    }
}

module.exports = Decryption;