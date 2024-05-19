const crypto = require('crypto');
const fs = require('fs');
const readlineSync = require('readline-sync');

// Algorithm settings
const algorithm = 'aes-256-ctr';

// Function to derive a key from the user-provided secret
function getKeyFromSecret(secret) {
  return crypto.createHash('sha256').update(secret).digest();
}

// Function to encrypt a file
function encryptFile(inputPath, outputPath, key) {
  const iv = crypto.randomBytes(16); // 128-bit IV
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const readStream = fs.createReadStream(inputPath);
  const writeStream = fs.createWriteStream(outputPath);

  writeStream.write(iv); // Prepend IV to the output file
  readStream.pipe(cipher).pipe(writeStream);

  writeStream.on('finish', () => {
    console.log(`File encrypted successfully: ${outputPath}`);
  });
}

// Function to decrypt a file
function decryptFile(inputPath, outputPath, key) {
  const readStream = fs.createReadStream(inputPath);
  let iv = Buffer.alloc(16);
  readStream.once('data', (chunk) => {
    iv = chunk.slice(0, 16); // Extract IV from the input file
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const remainingStream = fs.createReadStream(inputPath, { start: 16 });
    remainingStream.pipe(decipher).pipe(fs.createWriteStream(outputPath));
    remainingStream.on('end', () => {
      console.log(`File decrypted successfully: ${outputPath}`);
    });
  });
}

// Get user input
const secret = readlineSync.question('Enter your secret key: ', {
  hideEchoBack: true, // Mask the input
});
const key = getKeyFromSecret(secret);

const action = readlineSync.question('Do you want to (e)ncrypt or (d)ecrypt a file? ', {
  limit: ['e', 'd'],
});
const inputFilePath = readlineSync.question('Enter the input file path: ');
const outputFilePath = readlineSync.question('Enter the output file path: ');

if (action === 'e') {
  encryptFile(inputFilePath, outputFilePath, key);
} else {
  decryptFile(inputFilePath, outputFilePath, key);
}
