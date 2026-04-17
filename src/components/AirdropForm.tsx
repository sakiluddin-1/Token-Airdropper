"use client";

import { useState, useMemo } from "react";
import { InputField } from "./ui/InputField";
import {chainsToTSender, tsenderAbi, erc20Abi} from "../constants";
import {useChainId, useConfig, useAccount, useWriteContract} from "wagmi";
import {readContract, waitForTransactionReceipt} from "@wagmi/core";
import {calculateTotal} from "@/utils/calculateTotal/calculateTotal";

export default function AirdropForm() {
  const [tokenAddress, setTokenAddress] = useState("");
  const [recipentAddresses, setRecipientAddresses] = useState("");
  const [amount, setAmount] = useState("");
  const chainId = useChainId();
  const config = useConfig();
  const account = useAccount();
  const total: number = useMemo(() => calculateTotal(amount), [amount]);
  const {data: hash, isPending, writeContractAsync} = useWriteContract();

  async function getApprovedAmount(tSenderAddress: string | null): Promise<number> {
    if(!tSenderAddress) {
      alert("No address found, please use supported chain");
      return 0;
    }

    const response = await readContract(config, {
      address: tokenAddress as `0x{string}`,
      abi: erc20Abi,
      functionName: "allowance",
      args: [account.address, tSenderAddress  as `0x${string}`],
    });

    return response as number;
  }

  async function handleSubmit() {
    const tSenderAddress = chainsToTSender[chainId]["tsender"];
    const approvedAmount = await getApprovedAmount(tSenderAddress);
    
    if(approvedAmount < total) {
      const approvalHash = await writeContractAsync({
        abi: erc20Abi,
        address: tokenAddress as `0x${string}`,
        functionName: "approve",
        args: [tSenderAddress as `0x${string}`, BigInt(total)],
      })
      const approvalReceipt = await waitForTransactionReceipt(config, {
      hash: approvalHash
    })
    } else {
      await writeContractAsync({
        abi: tsenderAbi,
        address: tSenderAddress as `0x${string}`,
        functionName: "airdropERC20",
        args: [
            tokenAddress,
            recipentAddresses.split(/[,\n]+/).map(addr => addr.trim()).filter(addr => addr !== ''),
            amount.split(/[,\n]+/).map(amt => amt.trim()).filter(amt => amt !== ''),
            BigInt(total),
          ],
      },)
    }
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