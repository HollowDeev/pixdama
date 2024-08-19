'use client'

import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown'
import { CrownSimple, GearSix, PencilSimple, Users, Wallet } from '@phosphor-icons/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import alterarSenha from '../actions/alterarSenha'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

function painelAdm() {

    const [quantidadeUsuarios, definirQuantidadeUsuarios] = useState(0)

    useEffect(() => {
        const buscar = async () => {
            const dados = await axios({
                url: '/api/totalUsuarios',
                headers: { 'authorization': 'XMLHttpRequest' },
            })
            definirQuantidadeUsuarios(dados.data)
        }

        buscar()
    }, [])

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
            let emailUsuario = data.user.email

            const formatarNomeUsuario = (nomeCompleto) => {
                const nomes = nomeCompleto.trim().split(" ");

                let primeiroNome = nomes[0];

                primeiroNome = primeiroNome.charAt(0).toUpperCase() + primeiroNome.slice(1).toLowerCase();

                return primeiroNome;
            }

            if (error || !data) {
                definirUsuarioAutenticado(false)
                route.push('/')
            } else {
                let { data: dados_usuarios, error } = await supabase
                    .from('dados_usuarios')
                    .select("*")
                    .eq('id_usuario', data.user.id)

                if (error) {
                    console.error(error)
                } else {
                    if (dados_usuarios[0].nivel_usuario != 2) {
                        definirUsuarioAutenticado(false)
                        route.push('/')
                    } else {
                        definirUsuarioAutenticado(true)
                        definirDadosUsuarios({
                            nome: formatarNomeUsuario(dados_usuarios[0].nome),
                            email: emailUsuario
                        })
                    }

                }


            }
        }

        verificarSessao()
    }, [])

    const redefinirSenha = () => {
        alterarSenha(dadosUsuarios.email)
        alert('Um link para redefinição da sua senha foi enviado para o seu email!')
      }

    return (
        <main className='flex min-h-screen flex-col items-center px-2 py-9 md:px-16 gap-5 text-white'>
            {usuarioAutenticado && (
                <>
                    <div className='w-full flex items-center justify-between'>
                        <h1 className='font-black text-3xl'>Olá, {dadosUsuarios.nome}</h1>
                        <Dropdown className='dark'>
                            <DropdownTrigger>
                                <GearSix size={40} weight="duotone" className='cursor-pointer' />
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem onClick={() => redefinirSenha()} className='text-white' startContent={
                                    <PencilSimple size={25} weight="duotone"/>
                                }>
                                    Alterar Senha
                                </DropdownItem>

                            </DropdownMenu>
                        </Dropdown>

                    </div>
                    <p className='font-bold mt-7 md:mt-10 md:text-2xl'>Dashboard</p>
                    <div className='w-full flex flex-col gap-2 md:flex-row'>
                        <div className='w-full md:w-auto grow py-6 px-4 border-stone-600 border-2 rounded-2xl flex items-center gap-5'>
                            <Users size={32} weight="duotone" />
                            <div>
                                <h2 className='font-bold text-xl'>Total de Usuarios</h2>
                                <p className='text-xl'>{quantidadeUsuarios}</p>
                            </div>
                        </div>
                        <div className='w-full md:w-auto grow py-6 px-4 border-stone-600 border-2 rounded-2xl flex items-center gap-5'>
                            <CrownSimple size={32} weight="duotone" />
                            <div>
                                <h2 className='font-bold text-xl'>Total de Partidas</h2>
                                <p className='text-xl'>0</p>
                            </div>
                        </div>
                        <div className='w-full md:w-auto grow py-6 px-4 border-stone-600 border-2 rounded-2xl flex items-center gap-5'>
                            <CrownSimple size={32} weight="duotone" />
                            <div>
                                <h2 className='font-bold text-xl'>Partidas do ultimo mês</h2>
                                <p className='text-stone-500 text-sm'>Partidas referente ao mês de agosto</p>
                                <p className='text-xl'>5</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex flex-col gap-2  md:flex-row'>
                        <div className='w-full py-6 px-4 md:w-auto grow border-stone-600 border-2 rounded-2xl flex items-center gap-5'>
                            <Wallet size={32} weight="duotone" />
                            <div>
                                <h2 className='font-bold text-xl'>Taxa total arrecadada</h2>
                                <p className='text-xl'>R$ 0,00</p>
                            </div>
                        </div>
                        <div className='w-full py-6 px-4 md:w-auto grow border-stone-600 border-2 rounded-2xl flex items-center gap-5'>
                            <Wallet size={32} weight="duotone" />
                            <div>
                                <h2 className='font-bold text-xl'>Taxa arrecadada mensal</h2>
                                <p className='text-stone-500 text-sm'>Calculo referente ao mês de agosto</p>
                                <p className='text-xl'>R$ 0,00</p>
                            </div>
                        </div>
                    </div>
                </>
            )}


        </main>

    )
}

export default painelAdm