'use client'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal'
import { Eye, EyeClosed } from '@phosphor-icons/react'
import React, { useState } from 'react'

function ModalLogin({ tipoModal, isOpen, onOpenChange }) {


    // Gerenciadores da visibilidade da senha
    const [senhaVisivel, definirSenhaVisivel] = useState(false)
    const [confirmarSenhaVisivel, definirConfirmarSenhaVisivel] = useState(false)

    // Valores dos inputs
    const [nome, definirNome] = useState('')
    const [email, definirEmail] = useState('')
    const [senha, definirSenha] = useState('') 
    const [confirmarSenha, definirConfirmarSenha] = useState('') 

    // Estado para mudar de painel apos aberto
    const [novoTipoModal, definirNovoTipoModal] = useState()

    const criarConta = async () => {
        if(nome == '' || email == '' || senha == '' || confirmarSenha == '' || senha != confirmarSenha){
            console.log('impossivel logar')
        }else {
            await signup(email, senha)
        }
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="dark" backdrop="blur">
            {
                tipoModal == "cadastro" || novoTipoModal == 'cadastro' ?

                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1 text-white">Bem Vindo ao Pix Dama!</ModalHeader>
                                <ModalBody>
                                    <p className="text-white">Vamos começar criando a sua conta?</p>

                                    <Input className="dark text-white" variant="bordered" label="Nome" type="text" placeholder="Seu Nome Completo" isRequired onValueChange={definirNome}  value={nome}/>

                                    <Input className="dark text-white" variant="bordered" label="Email" type="email" placeholder="seuemail@gmail.com" isRequired onValueChange={definirEmail} value={email}/>

                                    <Input className="dark text-white" variant="bordered" label="Confirmar Senha" type={senhaVisivel ? "text" : "password"} placeholder={senhaVisivel ? "sua senha" : "*******"} isRequired onValueChange={definirSenha} value={senha}
                                        endContent={
                                            <button onClick={() => definirSenhaVisivel(!senhaVisivel)}>
                                                {senhaVisivel ?
                                                    <Eye size={20} weight="bold" />
                                                    :
                                                    <EyeClosed size={20} weight="bold" />
                                                }
                                            </button>
                                        }

                                    />

                                    <Input className="dark text-white" variant="bordered" label="Senha" type={confirmarSenhaVisivel ? "text" : "password"} placeholder={confirmarSenhaVisivel ? "sua senha" : "*******"} isRequired value={confirmarSenha} onValueChange={definirConfirmarSenha}
                                        endContent={
                                            <button onClick={() => definirConfirmarSenhaVisivel(!confirmarSenhaVisivel)}>
                                                {confirmarSenhaVisivel ?
                                                    <Eye size={20} weight="bold" />
                                                    :
                                                    <EyeClosed size={20} weight="bold" />
                                                }
                                            </button>
                                        }

                                    />

                                    <div className='text-center'>
                                        <p className='text-white text-sm'>Já tem uma conta? Então não perca tempo <br /> <span className='font-bold cursor-pointer' onClick={() => definirNovoTipoModal('login')}>entre e derorte seus adiversarios!!!</span></p>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Cancelar
                                    </Button>
                                    <Button color="success" onPress={criarConta}>
                                        Criar
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                    :
                    tipoModal = 'login' || novoTipoModal == 'login' ?
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1 text-white">Bem Vindo ao Pix Dama!</ModalHeader>
                                    <ModalBody>
                                        <p className="text-white">Vamos Jogar?</p>

                                        <Input className="dark text-white" variant="bordered" label="Email" type="email" placeholder="seuemail@gmail.com" isRequired />


                                        <Input className="dark text-white" variant="bordered" label="Senha" type={senhaVisivel ? "text" : "password"} placeholder={senhaVisivel ? "sua senha" : "*******"} isRequired
                                            endContent={
                                                <button onClick={() => definirSenhaVisivel(!senhaVisivel)}>
                                                    {senhaVisivel ?
                                                        <Eye size={20} weight="bold" />
                                                        :
                                                        <EyeClosed size={20} weight="bold" />
                                                    }
                                                </button>
                                            }

                                        />
                                        <p className='text-white text-[12px] cursor-pointer font-bold'>Esqueceu sua Senha?</p>

                                        <div className='text-center'>
                                            <p className='text-white text-sm'>Ainda não tem uma conta? Então o que está esperando, <span className='font-bold cursor-pointer' onClick={() => definirNovoTipoModal('cadastro')}>Crie já sua conta grátis</span></p>
                                        </div>

                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={onClose}>
                                            Cancelar
                                        </Button>
                                        <Button color="success" onPress={onClose}>
                                            Entrar
                                        </Button>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                        :
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1 text-white">Bem Vindo ao Pix Dama!</ModalHeader>
                                    <ModalBody>
                                        <p className="text-white">Vamos Jogar?</p>

                                        <Input className="dark text-white" variant="bordered" label="Email" type="email" placeholder="seuemail@gmail.com" isRequired />


                                        <Input className="dark text-white" variant="bordered" label="Senha" type={senhaVisivel ? "text" : "password"} placeholder={senhaVisivel ? "sua senha" : "*******"} isRequired
                                            endContent={
                                                <button onClick={() => definirSenhaVisivel(!senhaVisivel)}>
                                                    {senhaVisivel ?
                                                        <Eye size={20} weight="bold" />
                                                        :
                                                        <EyeClosed size={20} weight="bold" />
                                                    }
                                                </button>
                                            }

                                        />
                                        <p className='text-white text-[12px] cursor-pointer font-bold'>Esqueceu sua Senha?</p>

                                        <div className='text-center'>
                                            <p className='text-white text-sm'>Ainda não tem uma conta? Então o que está esperando, <span className='font-bold cursor-pointer' onClick={() => definirNovoTipoModal('cadastro')}>Crie já sua conta grátis</span></p>
                                        </div>

                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={onClose}>
                                            Cancelar
                                        </Button>
                                        <Button color="success" onPress={onClose}>
                                            Entrar
                                        </Button>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
            }
        </Modal>
    )
}

export default ModalLogin
