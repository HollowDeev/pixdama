

import { Button } from '@nextui-org/button'
import { Fire } from '@phosphor-icons/react/dist/ssr'

import { verificarSessao } from '../../actions/verificarSessao'
import TabelaTransacoes from '@/app/components/TabelaTransacoes'

export default async function painelUsuario() {

    const dados = await verificarSessao()

    return (
        <main className='flex min-h-screen flex-col items-center px-2 py-9 md:px-16 gap-10 text-white'>
            {dados.usuarioAutenticado && (
                <>
                    <div className='flex flex-col md:hidden w-full gap-5'>
                        <div className='flex justify-start w-full'>
                            <div className='flex flex-col gap3'>
                                <div><h1 className='font-bold text-4xl'>Olá, {dados.nome}</h1></div>
                                <div>
                                    <p className='text-stone-500'>Saldo Atual:</p>
                                    <p >R$ 0,00</p>
                                </div>
                            </div>
                        </div>
                        <div className='w-full flex flex-col gap-3' >
                            <Button className='w-full bg-white text-black' variant='solid'>DEPOSITAR</Button>
                            <Button className='w-full' variant='bordered'>SACAR</Button>
                        </div>

                        <div className="flex items-center w-full justify-between">
                            <div className="flex items-center gap-3">
                                <Fire size={50} color="#ff2424" weight="fill" />
                                <p className="text-white font-bold">Vitorias <br /> em <br /> Sequência</p>
                            </div>
                            <p className={`text-white font-black text-6xl `}>
                            {dados.vitoriasEmSequencia}
                            </p>
                        </div>

                    </div>
                    <div className='md:flex flex-col hidden w-full gap-5'>
                        <div className='flex justify-between'>
                            <div className='flex justify-start '>
                                <div className='flex flex-col gap3'>
                                    <div><h1 className='font-bold text-4xl'>Olá, {dados.nome}</h1></div>
                                    <div>
                                        <p className='text-stone-500'>Saldo Atual:</p>
                                        <p >R$ 0,00</p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center gap-20'>
                                <div className="flex items-center gap-3">
                                    <Fire size={50} color="#ff2424" weight="fill" />
                                    <p className="text-white font-bold">Vitorias <br /> em <br /> Sequência</p>
                                </div>
                                <p className={`text-white font-black text-6xl `}>
                                    {dados.vitoriasEmSequencia}
                                </p>

                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className='flex gap-3' >
                                <Button className='w-full bg-white text-black' variant='solid'>DEPOSITAR</Button>
                                <Button className='w-full' variant='bordered'>SACAR</Button>
                            </div>
                        </div>

                    </div> 
                    <div className='flex flex-col gap-5 w-full'>
                        <div className='flex flex-col items-start w-full'>
                            <h1 className='text-2xl font-bold'>Transações</h1>
                            <p className='text-stone-400'>Acompanhe as ultimas movimentações de sua carteira</p>
                        </div>  
                        <TabelaTransacoes />
                    </div> 
                    <div className="w-full h-20 bg-stone-900 fixed bottom-0 flex items-center justify-around z-50 md:hidden">
                         <p className="text-white font-black text-xl">DAMAS</p>
                        <Button  size="sm" radius="full" className="bg-white text-black text-xl font-black ">
                            Jogue Agora
                        </Button>
                    </div>
                </>
            )}
        </main>
    )
}

