const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const SHA256 = require('crypto-js/sha256');

const privateKey = secp.utils.randomPrivateKey();
console.log('random privateKey ' + toHex(privateKey));

const PRIVATE_KEY = "8f8604c99f445a963b6434a6c9526d9a63ec49484c2fd872173b2daf4c6298cc";
const PRIVATE_KEY_2 = '9b7e33405011c3de6e516ef21e85dc4b5f7e35268a22b00a369cc75aecf1665c';
const PRIVATE_KEY_3 = 'fc66d0659d858e83e23e4e2ac014c3f8c242b7eadfc81da43bae82941d1f2c0c';

async function signMessage(msg, privateKey) {
    const hashMsg = hashMessage(msg);
    return secp.sign(hashMsg, privateKey, { recovered: true })
}

function hashMessage(message) {
    const bytes = utf8ToBytes(message);
    const hash = keccak256(bytes); 
    return hash;
}

// console.log('private key ' + toHex(privateKey));
(async() => {
    let signatureArray1 = await signMessage('send crypto', PRIVATE_KEY);
    let signatureArray2 = await signMessage('send crypto', PRIVATE_KEY_2);
    let signatureArray3 = await signMessage('send crypto', PRIVATE_KEY_3);
    console.log('Signature ' + toHex(signatureArray1[0]));
    // console.log('public key ' + toHex(secp.getPublicKey(PRIVATE_KEY)));
    // get private key from signature
    const address1 = secp.recoverPublicKey(hashMessage('send crypto'), toHex(signatureArray1[0]), signatureArray1[1]);
    const address2 = secp.recoverPublicKey(hashMessage('send crypto'), toHex(signatureArray2[0]), signatureArray2[1]);
    const address3 = secp.recoverPublicKey(hashMessage('send crypto'), toHex(signatureArray3[0]), signatureArray3[1]);

    console.log('address 1 ' + toHex(address1));
    console.log('address 2 ' + toHex(address2));
    console.log('address 3 ' + toHex(address3));
})();
