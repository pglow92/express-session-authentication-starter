const crypto = require('crypto');
const fs = require('fs');
const decrypt = require('./Test/decrypt');

//This is the data we are recieving from the sender
const receivedData = require("./signMessage").packageOfDataToSend;

const hash = crypto.createHash(receivedData.algorithm); // Create hash with algorithm that was provided by the sender

const publicKey = fs.readFileSync(__dirname + '/id_rsa_pub.pem', 'utf8');

// decrypt message with public key, that was encrypted by sender with private key --> hash value
const decryptedMessage = decrypt.decryptWithPublicKey(publicKey, receivedData.signedAndEncryptedData);

const decryptedMessageHex = decryptedMessage.toString();

const hashOfOriginal = hash.update(JSON.stringify(receivedData.originalData));
const hashOfOriginalHex = hash.digest("hex");

if (hashOfOriginalHex === decryptedMessageHex){
    console.log("success. The data has not been tampered with and sender is valid")
} else {
    console.log("No")
}