

import { Inter } from "next/font/google";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, NextUIProvider, useDisclosure } from "@nextui-org/react"
import "./globals.css";
import Header from "./components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pix Dama",
  description: "",
  icons: {
    icon: '/favicon.png',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} bg-stone-950`}>
        <NextUIProvider className="dark">
          <Header />
          {children}
        </NextUIProvider>
      </body>
    </html>
  );
}
