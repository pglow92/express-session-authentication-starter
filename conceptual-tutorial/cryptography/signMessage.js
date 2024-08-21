const crypto = require('crypto');
const hash = crypto.createHash('sha256');
const fs = require('fs');
const encrypt = require('./encrypt');
const decrypt = require('./Test/decrypt');

const myData = {
    firstName: "Zack",
    lastName: "Gollwitzer",
    socialSecurityNumber: "NO NO NO. Never put personal info in a digitally signed message since this for of cryptography does not hide the data!!!"
};

// myData has to be compressed first
// Convert to String that can be hashed
const myDataString = JSON.stringify(myData);
hash.update(myDataString);
// Convert hash to hexadecimal format
const hashedData = hash.digest("hex");

const senderPrivateKey = fs.readFileSync(__dirname + "/id_rsa_priv.pem", "utf8");

const signedMessage = encrypt.encryptWithPrivateKey(senderPrivateKey, hashedData);

// Reciever requires information: 1)Type of hash function, 2) Unencrypted data, 3) Encrpyted data

const packageOfDataToSend = {
    algorithm: "sha256",
    originalData: myData,
    signedAndEncryptedData: signedMessage
};

module.exports.packageOfDataToSend = packageOfDataToSend;