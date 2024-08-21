const fs = require('fs');
const encrypt = require('./encrypt');
const decrypt = require('./decrypt');

// Keep data safe --> Encrypt with public key, decrypt with private key
// Verify identity --> Encrypt with private key, decrypt with public key

const publicKey = fs.readFileSync(__dirname + '/id_rsa_pub.pem', 'utf8');
const privateKey = fs.readFileSync(__dirname + '/id_rsa_priv.pem', 'utf8');

// Example 1: Keep data safe
const encryptedMessage = encrypt.encryptWithPublicKey(publicKey, "super secret message");

console.log(encryptedMessage.toString());

const decryptedMessage = decrypt.decryptWithPrivateKey(privateKey, encryptedMessage);

console.log(decryptedMessage.toString());

// Example 2: Verify identity