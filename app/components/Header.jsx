'use client'

import { Button } from '@nextui-org/button'
import { useDisclosure } from '@nextui-org/modal'
import { UserCircle } from '@phosphor-icons/react'

import React, { useEffect, useState } from 'react'
import ModalLogin from './ModalLogin'
import MediaQuery from 'react-responsive'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

function Header() {

  const supabase = createClient()

  const router = useRouter()

  // Gerenciadores do Modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [tipoModal, definirTipoModal] = useState('cadastro')

  const abrirModal = (tipo) => {
    definirTipoModal(tipo)
    onOpen()
  }

  const [usuarioAutenticado, definirUsuarioAutenticado] = useState(false)

  

  useEffect(() => {

    supabase.auth.onAuthStateChange((event) => {
      if(event == "SIGNED_IN") {
        definirUsuarioAutenticado(true)
      } else if(event == "SIGNED_OUT") {
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

  const fecharSessao = async () => {
    const { error } = await supabase.auth.signOut()

      if(error) {
        console.log(error)
      } else {
        definirUsuarioAutenticado(false)
        router.push('/')
      }
    
  }

  return (
    <>
      <div className='bg-gray-700 w-full h-16 flex items-center px-10 justify-between'>
        <Link href="/" className='cursor-pointer'>
          <p className='text-xl text-white '>PIX <span className='font-black text-gray-300'>Dama</span> </p>
        </Link>
        {
          usuarioAutenticado ?
            (
              <Button variant='ghost' className='bg-gray-100 text-black font-bold' onPress={fecharSessao}>
                Sair
              </Button>
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
        {/* <Dropdown className='dark'>
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
        </Dropdown> */}

      </div>
      <ModalLogin isOpen={isOpen} onOpenChange={onOpenChange} tipoModal={tipoModal} />
    </>
  )
}

export default Header