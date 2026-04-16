"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      {/* Left: Title */}
      <h1 className="text-xl md:text-2xl font-bold text-800">
        Token Airdropper
      </h1>

      {/* Right: Wallet Connect */}
      <div>
        <ConnectButton />
      </div>
    </header>
  );
}