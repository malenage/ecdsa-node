const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const { toHex } = require("ethereum-cryptography/utils");

app.use(cors());
app.use(express.json());

const balances = {
  "04e605f8eee731d2bb82eec7edd9b3c88b9c4627159c31af594e6e8ae9d3e74ac96853e208f6b62a36d5aec4ccad6176a85ce79a62a3d686634f7c0fae1c60a711": 100,
  "04f123a8f06330d1df712a713f45a51969c49602a93f684abb7e06f20235f207cfcf9d40a92a0eab3c478e05cac10daf87aef1bebb6cf6cccc4737179bccd253ce": 50,
  "042c5b372b3810893e68689cdcc047641ceed537c90459e8cec2a46b04b87c081dd66340f5ef29c4e1625116ec59cd1b6c4d95b9345f36ad5d26d613b33221d32b": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const {recipient, amount, message, signature, recoveryBit } = req.body;
  const senderAddress = secp.recoverPublicKey(hashMessage(message), signature, recoveryBit);
  const sender = toHex(senderAddress);

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

function hashMessage(message) {
  const bytes = utf8ToBytes(message);
  const hash = keccak256(bytes); 
  return hash;
}
