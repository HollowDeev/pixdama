
import { Button } from "@nextui-org/button";
import { Trophy } from "@phosphor-icons/react/dist/ssr";
import { verificarSessao } from "./actions/verificarSessao";
import Duvidas from "./components/Duvidas";

export default async function Home() {

  const dados = await verificarSessao()
  console.log(dados)

  return (
    <main className="flex min-h-screen flex-col items-center px-2 py-9 md:px-10 gap-10">

      {dados.usuarioAutenticado &&
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
          <Button size="sm" radius="full" className="bg-white text-black text-2xl font-black md:hidden" href="/auth/login">Jogar</Button>
          <Button size="lg" radius="full" className="bg-white text-black text-2xl font-black hidden md:block" href="/auth/login">Jogar</Button>
        </div>
      </div>

      <div className="flex flex-col gap-10 lg:flex-row w-full">
        <div className="flex items-center w-full justify-between">
          <div className="flex items-center gap-3">
            <Trophy size={80} color="#e1a014" weight="fill" />
            <p className="text-white font-bold">Total <br /> de <br /> Vitorias</p>
          </div>
          <p className={`text-white font-black text-6xl ${!dados.usuarioAutenticado && "blur-sm"}`}>
            {dados.usuarioAutenticado ? dados.totalVitorias : 18} 
          </p>
        </div>

        <Duvidas />
      </div> 

      {!dados.usuarioAutenticado &&
        <Button href="/auth/login" radius="full" variant="bordered" className="lg:text-xl w-full text-white font-black">Entre e derrote seus inimigos</Button>
      }
      <div className="w-full h-20 bg-stone-900 fixed bottom-0 flex items-center justify-around z-50 md:hidden">
        <p className="text-white font-black text-xl">DAMAS</p>
        <Button href="/auth/login" size="sm" radius="full" className="bg-white text-black text-xl font-black ">Jogue Agora</Button>
      </div>
      
    </main>

  );
}
