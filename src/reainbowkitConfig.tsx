"use client"

import {getDefaultConfig} from "@rainbow-me/rainbowkit";
import {anvil, zkSync} from "wagmi/chains";

export default getDefaultConfig({
    appName: "Token Airdropper",
    projectId: "545",
    chains: [anvil, zkSync],
    ssr: false,
})