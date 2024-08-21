const crypto = require('crypto');
const fs = require('fs'); // file system
const { format } = require('path');

genKeyPair();

function genKeyPair(){
    const keyPair = crypto.generateKeyPairSync('rsa', {
        modulusLength : 4096, //bits - standard for rsa
        publicKeyEncoding: {
            type: 'pkcs1', //Public key craptography stanards 1
            format: 'pem'  // most common formatting choice
        },
        privateKeyEncoding: {
            type: 'pkcs1', //Public key craptography stanards 1
            format: 'pem'  // most common formatting choice
        }
    })

    // Create the public key file
    fs.writeFileSync(__dirname + '/id_rsa_pub.pem', keyPair.publicKey);

    // Create the private key file
    fs.writeFileSync(__dirname + '/id_rsa_priv.pem', keyPair.privateKey);
};

