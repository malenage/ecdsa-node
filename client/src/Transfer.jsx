import { useState } from "react";
import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes } from "ethereum-cryptography/utils";
import { toHex } from "ethereum-cryptography/utils";

function Transfer({ address, privateKey, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);
  const message = {
    address,
    recipient,
    amount: sendAmount
  }

  async function signMessage() {
    const hashMsg = hashMessage(message);
    return secp.sign(hashMsg, privateKey, { recovered: true })
  }

  function hashMessage(message) {
    const bytes = utf8ToBytes(JSON.stringify(message));
    const hash = keccak256(bytes); 
    return hash;
}

  async function transfer(evt) {
    evt.preventDefault();
    const signatureArray = await signMessage();
    const hashedMessage = hashMessage(message);
    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        // sender: address,
        amount: parseInt(sendAmount),
        recipient,
        message: JSON.stringify(message),
        signature: toHex(signatureArray[0]),
        recoveryBit: signatureArray[1]
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
