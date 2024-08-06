'use client'

import { useDisclosure } from "@nextui-org/modal";
import ModalLogin from "./components/ModalLogin";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@nextui-org/button";
import { Trophy } from "@phosphor-icons/react";
import { Accordion, AccordionItem } from "@nextui-org/react";

export default function Home() {

  const supabase = createClient()

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const [usuarioAutenticado, definirUsuarioAutenticado] = useState(false)

  useEffect(() => {

    supabase.auth.onAuthStateChange((event) => {
      if (event == "SIGNED_IN") {
        definirUsuarioAutenticado(true)
      } else if (event == "SIGNED_OUT") {
        definirUsuarioAutenticado(false)
      }
    })

    const verificarSessao = async () => {
      const { data: user, error } = await supabase.auth.getUser()

      if (error || !user) {
        definirUsuarioAutenticado(false)
      } else {
        definirUsuarioAutenticado(true)
      }
    }

    verificarSessao()
  }, [])


  return (
    <main className="flex min-h-screen flex-col items-center pb-28 px-2 py-9 gap-10">

      {usuarioAutenticado &&
        <div className="w-full flex items-center justify-between">
          <div className="text-white flex flex-col">
            <p className="text-stone-400">Saldo Disponivel</p>
            <p>R$ 0,00</p>
          </div>
          <Button size="sm" radius="full" className="bg-white text-black font-black ">Depositar</Button>
        </div>
      }
      <div className="w-full flex flex-col items-center justify-center">
        <img src="tabuleiro.jpg" className="rounded-3xl z-0 static md:hidden" />
        <img src="tabuleiro-desktop.jpg" className="rounded-3xl z-0 static hidden md:block" />
        <div className="z-10 text-white absolute flex justify-center items-center flex-col text-center gap-5 cursor-pointer px-2" >
          <p className=" font-black text-2xl md:text-5xl">Damas</p>
          <p className="z-10 text-white text-sm md:text-2xl">Desafie sua mente e domine o tabuleiro! Jogue damas online agora e <span className="font-bold">prove sua estratégia</span>!</p>
          <Button size="sm" radius="full" className="bg-white text-black text-2xl font-black md:hidden" onClick={() => !usuarioAutenticado ? onOpen() : console.log('Usuario Logado')}>Jogar</Button>
          <Button size="lg" radius="full" className="bg-white text-black text-2xl font-black hidden md:block" onClick={() => !usuarioAutenticado ? onOpen() : console.log('Usuario Logado')}>Jogar</Button>
        </div>
      </div>

      <div className="flex items-center w-full justify-between">
        <div className="flex items-center gap-3">
          <Trophy size={80} color="#e1a014" weight="fill" />
          <p className="text-white font-bold">Total <br /> de <br /> Vitorias</p>
        </div>
        <p className={`text-white font-black text-6xl ${!usuarioAutenticado && "blur-sm"}`}>
          {usuarioAutenticado ? (0) : 18}
        </p>
      </div>

      {!usuarioAutenticado &&
        <Button onClick={() => !usuarioAutenticado ? onOpen() : console.log('Usuario Logado')} radius="full" variant="bordered" className=" w-full text-white font-black">Entre e derrote seus inimigos</Button>
      }



      <div className="flex flex-col w-full">
        <p className="text-white font-bold text-xl">Tire suas Dúvidas:</p>
        <Accordion variant="bordered" isCompact>
          <AccordionItem title='Como posso ter certeza de que a plataforma é segura para realizar apostas?' key='1'>
            <p className="text-white">Nossa plataforma utiliza tecnologia de criptografia de ponta para proteger todas as transações e dados dos usuários. Além disso, realizamos auditorias de segurança regularmente para garantir a integridade e a segurança do nosso sistema.</p>
          </AccordionItem>
          <AccordionItem title='Como são gerenciadas as minhas informações pessoais?' key='2'>
            <p className="text-white">As suas informações pessoais são tratadas com o máximo sigilo e apenas são usadas para fins de operação e melhoria da plataforma. Não compartilhamos suas informações com terceiros sem o seu consentimento explícito.</p>
          </AccordionItem>
          <AccordionItem title=' Como posso garantir que as partidas são justas e sem trapaças?' key='3'>
            <p className="text-white">Utilizamos algoritmos avançados e monitoramento contínuo para detectar e prevenir qualquer atividade suspeita ou trapaça. Além disso, todas as partidas são supervisionadas por moderadores para garantir a integridade do jogo.</p>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="w-full h-20 bg-stone-900 fixed bottom-0 flex items-center justify-around z-50">
        <p className="text-white font-black text-xl">DAMAS</p>
        <Button onClick={() => !usuarioAutenticado ? onOpen() : console.log('Usuario Logado')} size="sm" radius="full" className="bg-white text-black text-xl font-black md:hidden">Jogue Agora</Button>
      </div>
      <ModalLogin isOpen={isOpen} onOpenChange={onOpenChange} tipoModal='login' />
    </main>

  );
}
