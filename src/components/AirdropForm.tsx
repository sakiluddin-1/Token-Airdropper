"use client";

import { useState } from "react";
import { InputField } from "./ui/InputField";
import {chainsToTSender, tsenderAbi, erc20Abi} from "../constants";

export default function AirdropForm() {
  const [tokenAddress, setTokenAddress] = useState("");
  const [recipentAddresses, setRecipientAddresses] = useState("");
  const [amount, setAmount] = useState("");
  const tSenderAddress = chainsToTSender[chainId]["tsender"];

  async function handleSubmit() {
    
  }

  return (
    <div className="w-full flex justify-center mt-12">
      {/* Container */}
      <div className="w-[75%] max-w-4xl border border-gray-200 rounded-2xl shadow-md p-8 bg-white">
        
        {/* Title */}
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Airdrop Tokens
        </h2>

        {/* Input */}
        <InputField
          label="Token Address"
          placeholder="0x..."
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value)}
        />

        <InputField
          label="Recipient Addresses"
          placeholder="0x123...,0x456..."
          value={recipentAddresses}
          onChange={(e) => setRecipientAddresses(e.target.value)}
          large={true}
        />

        <InputField
          label="Token Address"
          placeholder="100,200,300"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          large={true}
        />

        <div className="flex item-center w-full justify-center">
        <button onClick={handleSubmit} className="bg-blue-500 text-black py-2 px-4 rounded-lg mt-4 cursor-pointer ">
          Send Tokens
        </button>
        </div>

      </div>
    </div>
  );
}