'use client'

import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal'
import { Eye, EyeClosed, UserCircle } from '@phosphor-icons/react'

import React, { useState } from 'react'
import ModalLogin from './ModalLogin'
import MediaQuery from 'react-responsive'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown'

function Header() {

  // Gerenciadores do Modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [tipoModal, definirTipoModal] = useState('cadastro')

  const abrirModal = (tipo) => {
    definirTipoModal(tipo)
    onOpen()
  }



  return (
    <>
      {/* <div className='bg-gray-700 w-full h-16 flex items-center px-10 justify-between'>
        <p className='text-xl text-white'>PIX <span className='font-black text-gray-300'>Dama</span> </p>
        <MediaQuery minWidth={660}>
          <nav className='flex gap-5'>
            <Button variant='shadow' className='bg-gray-100 text-black font-bold' onClick={() => abrirModal('login')}>
              Entrar
            </Button>
            <Button variant='light' onClick={() => abrirModal('cadastro')}>
              Cadastra-se
            </Button>
          </nav>
        </MediaQuery>
        <MediaQuery maxWidth={660}>
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

        </MediaQuery>
      </div> */}
      {/* <ModalLogin isOpen={isOpen} onOpenChange={onOpenChange} tipoModal={tipoModal} /> */}
    </>
  )
}

export default Header