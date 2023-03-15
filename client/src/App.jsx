import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey ] = useState("");
  // const [signature, setSignature ] = useState("");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        // signature={signature}
        privateKey={privateKey}
        setPrivateKey={setPrivateKey}
        // setSignature={setSignature}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
      />
      {/* will generate a signed transation - it will need the private key */}
      <Transfer setBalance={setBalance} address={address} privateKey={privateKey} />
    </div>
  );
}

export default App;
