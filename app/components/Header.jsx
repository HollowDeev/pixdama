'use client'

import { Button } from '@nextui-org/button'
import { useDisclosure } from '@nextui-org/modal'
import { ChartPieSlice, PencilSimple, SignOut, UserCircle, Wallet } from '@phosphor-icons/react'

import React, { useEffect, useState } from 'react'
import ModalLogin from './ModalLogin'
import MediaQuery from 'react-responsive'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import alterarSenha from '../actions/alterarSenha'
import { verificarSessao } from '../actions/verificarSessao'

function Header() {

  const supabase = createClient()

  const router = useRouter()

  // Gerenciadores do Modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [tipoModal, definirTipoModal] = useState()

  const abrirModal = (tipo) => {
    definirTipoModal(tipo)
    onOpen()
  }

  const [usuarioAutenticado, definirUsuarioAutenticado] = useState(false)
  const [dadosUsuarios, definirDadosUsuarios] = useState({})


  useEffect(() => {

    const verificar = async () => {
      const dados = await verificarSessao()

      definirDadosUsuarios(dados)
      definirUsuarioAutenticado(dados.usuarioAutenticado)
    }

    supabase.auth.onAuthStateChange((event) => {
      if (event == "SIGNED_IN") {
        verificar()
      } else if (event == "SIGNED_OUT") {
        definirUsuarioAutenticado(false)
      }
    })

    verificar()

  }, [])


  const fecharSessao = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.log(error)
    } else {
      definirUsuarioAutenticado(false)
      router.push('/')
    }

  }

  const redefinirSenha = async () => {
    const error = await alterarSenha(dadosUsuarios.email, dadosUsuarios.id)
    if(error){
      alert(error)
    }else {
      alert('Um link para redefinição da sua senha foi enviado para o seu email!')
    }
  }

  return (
    <>
      <div className='bg-gray-700 w-full h-16 flex items-center px-4 justify-between'>
        <Link href="/" className='cursor-pointer'>
          <p className='text-xl text-white '>PIX <span className='font-black text-gray-300'>Dama</span> </p>
        </Link>
        <div className='hidden md:flex'>
          {
            usuarioAutenticado ?
              (
                <Dropdown className='dark'>
                  <DropdownTrigger>
                    <UserCircle size={32} weight="fill" className='text-white' />
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem onClick={() => router.push("/painel-usuario")} className='text-white' startContent={

                      <Wallet size={25} weight="duotone" />
                    }>
                      Perfil | Carteira
                    </DropdownItem>

                    {dadosUsuarios.administrador &&
                      <DropdownItem onClick={() => router.push("/painel-adm")} className='text-white' startContent={

                        <ChartPieSlice size={25} weight="duotone" />
                      }>
                        Dashboard
                      </DropdownItem>
                    }

                    <DropdownItem onClick={() => redefinirSenha()} className='text-white' startContent={

                      <PencilSimple size={25} weight="duotone" />
                    }>
                      Redefinir Senha
                    </DropdownItem>

                    <DropdownItem onClick={() => fecharSessao()} color='danger' className='text-white' startContent={
                      <SignOut size={25} weight="duotone" />
                    }>
                      Sair
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              )
              :
              <nav className='flex gap-5'>
                <Button variant='shadow' className='bg-gray-100 text-black font-bold' onClick={() => abrirModal('login')}>
                  Entrar
                </Button>
                <Button variant='light' onClick={() => abrirModal('cadastro')}>
                  Cadastra-se
                </Button>
              </nav>
          }
        </div>
        <div className='md:hidden'>
          {
            usuarioAutenticado ?
              <Dropdown className='dark'>
                <DropdownTrigger>
                  <UserCircle size={32} weight="fill" className='text-white' />
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem onClick={() => router.push("/painel-usuario")} className='text-white' startContent={

                    <Wallet size={25} weight="duotone" />
                  }>
                    Perfil | Carteira
                  </DropdownItem>
                  {dadosUsuarios.administrador &&
                    <DropdownItem onClick={() => router.push("/painel-adm")} className='text-white' startContent={

                      <ChartPieSlice size={25} weight="duotone" />
                    }>
                      Dashboard
                    </DropdownItem>
                  }

                  <DropdownItem onClick={() => redefinirSenha()} className='text-white' startContent={

                    <PencilSimple size={25} weight="duotone" />
                  }>
                    Redefinir Senha
                  </DropdownItem>

                  <DropdownItem onClick={() => fecharSessao()} color='danger' className='text-white' startContent={
                    <SignOut size={25} weight="duotone" />
                  }>
                    Sair
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              :
              <Dropdown className='dark'>
                <DropdownTrigger>
                  <UserCircle size={32} weight="fill" className='text-white' />
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem onClick={() => abrirModal('login')} className='text-white'>
                    Entrar
                  </DropdownItem>
                  <DropdownItem onClick={() => abrirModal('cadastro')} className='text-white'>
                    Criar Conta
                  </DropdownItem>

                </DropdownMenu>
              </Dropdown>
          }
        </div>
      </div>
      <ModalLogin isOpen={isOpen} onOpenChange={onOpenChange} tipoModal={tipoModal} />
    </>
  )
}

export default Header