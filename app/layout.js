import { Inter } from "next/font/google";
import {NextUIProvider} from "@nextui-org/react"
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pix Dama",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <NextUIProvider className="dark">
          {children}
        </NextUIProvider>
      </body>
    </html>
  );
}
