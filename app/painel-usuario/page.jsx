'use client'

import { createClient } from '@/utils/supabase/client'
import { Button } from '@nextui-org/button'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { Fire, Trophy } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'

import React, { useEffect, useState } from 'react'

function painelUsuario() {
    const [usuarioAutenticado, definirUsuarioAutenticado] = useState(false)
    const [dadosUsuarios, definirDadosUsuarios] = useState({})
    const supabase = createClient()

    const route = useRouter()

    useEffect(() => {

        supabase.auth.onAuthStateChange((event) => {
            if (event == "SIGNED_IN") {
                definirUsuarioAutenticado(true)
            } else if (event == "SIGNED_OUT") {
                route.push('/')
            }
        })

        const verificarSessao = async () => {
            const { data, error } = await supabase.auth.getUser()

            if (error || !data) {
                definirUsuarioAutenticado(false)
                route.push('/')
            } else {
                definirUsuarioAutenticado(true)
                let { data: dados_usuarios, error } = await supabase
                    .from('dados_usuarios')
                    .select("*")
                    .eq('id_usuario', data.user.id)

                if (error) {
                    console.log(error)
                } else (
                    definirDadosUsuarios({
                        nome: dados_usuarios[0].nome,
                        totalVitorias: dados_usuarios[0].numero_vitorias,
                        vitoriasEmSequencia: dados_usuarios[0].vitorias_sequencia
                    })
                )


            }
        }

        verificarSessao()
    }, [])
    return (
        <main className='flex min-h-screen flex-col items-center px-2 py-9 md:px-16 gap-10 text-white'>
            {usuarioAutenticado && (
                <>
                    <div className='flex flex-col md:hidden w-full gap-5'>
                        <div className='flex justify-start w-full'>
                            <div className='flex flex-col gap3'>
                                <div><h1 className='font-bold text-4xl'>Olá, {dadosUsuarios.nome}</h1></div>
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
                                {dadosUsuarios.vitoriasEmSequencia}
                            </p>
                        </div>

                    </div>

                    <div className='md:flex flex-col hidden w-full gap-5'>
                        <div className='flex justify-between'>
                            <div className='flex justify-start '>
                                <div className='flex flex-col gap3'>
                                    <div><h1 className='font-bold text-4xl'>Olá, Thauã</h1></div>
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
                                    {dadosUsuarios.vitoriasEmSequencia}
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
                        <Table aria-label="Example static collection table" removeWrapper>
                            <TableHeader>
                                <TableColumn>DATA</TableColumn>
                                <TableColumn>TIPO</TableColumn>
                                <TableColumn>VALOR</TableColumn>
                                <TableColumn>SALDO</TableColumn>
                            </TableHeader>
                            <TableBody>
                                <TableRow key="1">
                                    <TableCell>12/08/2024</TableCell>
                                    <TableCell>Deposito</TableCell>
                                    <TableCell>R$ 50,00</TableCell>
                                    <TableCell>R$ 100,00</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>

                    <div className="w-full h-20 bg-stone-900 fixed bottom-0 flex items-center justify-around z-50 md:hidden">
                        <p className="text-white font-black text-xl">DAMAS</p>
                        <Button onClick={() => !usuarioAutenticado ? onOpen() : console.log('Usuario Logado')} size="sm" radius="full" className="bg-white text-black text-xl font-black ">Jogue Agora</Button>
                    </div>
                </>
            )}
        </main>
    )
}

export default painelUsuario