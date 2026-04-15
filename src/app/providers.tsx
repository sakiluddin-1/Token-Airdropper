"use client"

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import {ReactNode} from "react";
import { WagmiProvider } from "wagmi";
import config from "@/reainbowkitConfig";

export function Providers(props: {children: ReactNode}) {
    return (
        <WagmiProvider config={config}>
            <RainbowKitProvider>
                {props.children}
            </RainbowKitProvider>
        </WagmiProvider>
    )
}    