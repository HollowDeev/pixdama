'use client'

import { useDisclosure } from "@nextui-org/modal";
import ModalLogin from "./components/ModalLogin";
import { useEffect, useState } from "react";

export default function Home() {

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <main className="flex min-h-screen flex-col items-center  px-24 py-9">

      <div className="w-full flex h-[500px]">
        <img src="tabuleiro.jpg" width="92%" height="300px" className="rounded-tl-3xl rounded-bl-3xl" />
        <div className=" w-20 bg-white text-5xl font-black rounded-tr-3xl rounded-br-3xl flex flex-col items-center justify-center cursor-pointer hover:bg-stone-900 hover:text-white transition-all"
          onClick={() => onOpen()}
        >
          <p>J</p>
          <p>O</p>
          <p>G</p>
          <p>A</p>
          <p>R</p>
        </div>
      </div>
      {/* <ModalLogin isOpen={isOpen} onOpenChange={onOpenChange} tipoModal='login' /> */}
    </main>

  );
}
