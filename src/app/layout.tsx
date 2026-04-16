import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {ReactNode} from "react";
import {Providers} from "./providers";
import Header from "@/components/Hearder";

export const metadata: Metadata = {
  title: "Token Airdropper",
};

export default function RootLayout(props: {children: ReactNode}){

  return (
    <html>
      <body>
        <Providers>
          <Header/>
          {props.children}
        </Providers>
        </body>
    </html>
  );
}
