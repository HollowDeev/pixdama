'use client'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal'
import { Eye, EyeClosed } from '@phosphor-icons/react'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { entrar } from '../actions/entrar'
import { cadastro } from '../actions/registrar'
import { parseAbsoluteToLocal, parseDate } from '@internationalized/date'
import { DatePicker } from '@nextui-org/react'
import { I18nProvider } from '@react-aria/i18n'
import { maior18 } from '../actions/maior18'
import { Checkbox } from '@nextui-org/checkbox'
import Link from 'next/link'


function ModalLogin({ tipoModal, isOpen, onOpenChange }) {

    const router = useRouter()

    // Gerenciadores da visibilidade da senha
    const [senhaVisivel, definirSenhaVisivel] = useState(false)
    const [confirmarSenhaVisivel, definirConfirmarSenhaVisivel] = useState(false)

    // Valores dos inputs
    const [nome, definirNome] = useState('')
    const [email, definirEmail] = useState('')
    const [senha, definirSenha] = useState('')
    const [confirmarSenha, definirConfirmarSenha] = useState('')
    const [CPF, definirCPF] = useState('')
    const [dataNascimento, definirDataNascimento] = useState(parseDate("2000-01-01"))
    const [confirmaSerMaiorDeIdade, definirCorfirmacaoIdade] = useState(false)
    const [confirmaPreencherCorretamente, definirCofirmacaoDados] = useState(false)
    const [confirmaOsTermos, definirConfirmacaoTermos] = useState(false)

    // Gerencia a validade dos dados
    const [erroDeSenha, definirErroDeSenha] = useState({
        erro: false,
        mensagemErro: ''
    })
    const [erroCamposVazios, definirErroCamposVazios] = useState(false)
    const [erroMaiorDeIdade, definirErroMaiorDeIdade] = useState(false)

    // Gerencia Progresso de cadastro
    const [etapaCadastro, definirEtapaCadastro] = useState(1)


    const formatarCPF = (cpf) => {
        cpf = cpf.replace(/\D/g, '');

        cpf = cpf.substring(0, 11)

        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d)/, '$1/$2');
        cpf = cpf.replace(/(\d{2})(\d{1,2})$/, '$1-$2');

        definirCPF(cpf);
    }


    useEffect(() => {
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (senha != confirmarSenha && senha != '') {
            definirErroDeSenha({
                erro: true,
                mensagemErro: "As senhas digitadas são diferentes"
            })
        } else if (!regex.test(senha) && senha != '') {
            definirErroDeSenha({
                erro: true,
                mensagemErro: "A senha não atende todos os requisitos"
            })
        } else {
            definirErroDeSenha({
                erro: false,
                mensagemErro: ""
            })
        }


    }, [senha, confirmarSenha])


    const proximaEtapa = () => {
        if (nome == '' || email == '' || senha == '' || confirmarSenha == '' || senha != confirmarSenha) {
            definirErroCamposVazios(true)
        } else {
            definirErroCamposVazios(false)
            definirEtapaCadastro(2)
        }
    }

    const criarConta = async (fechar) => {
        const deMaior = maior18(dataNascimento)

        const { day, month, year } = dataNascimento;
        const dataFormatada = `${year}/${month}/${day}`

        if (CPF == '' || dataFormatada == "2000-01-01" || !confirmaPreencherCorretamente || !confirmaSerMaiorDeIdade) {
            definirErroCamposVazios(true)
        } else {
            if (deMaior) {
                definirErroCamposVazios(false)
                const { sucessoCadastro, mensagem } = await cadastro(nome, email, senha, CPF, dataFormatada, confirmaOsTermos, confirmaPreencherCorretamente, confirmaSerMaiorDeIdade)
                fechar()
                if (sucessoCadastro) {
                } else {
                    alert(mensagem)
                }
            } else {
                definirErroMaiorDeIdade(true)
            }
        }

    }

    const logar = async (fechar) => {
        const { sucessoLogin, mensagem } = await entrar(email, senha)
        fechar()
        if (sucessoLogin) {
        } else {
            router.push(`error/${mensagem}`)
            console.log(mensagem)
        }

    }

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="dark" backdrop="blur">
            {
                tipoModal == "cadastro"  ?
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1 text-white">Bem Vindo ao Pix Dama!</ModalHeader>
                                <ModalBody>
                                    <p className="text-white">Vamos começar criando a sua conta?</p>

                                    {etapaCadastro == 1 ? (
                                        <>
                                            <Input className="dark text-white" variant="bordered" label="Nome" type="text" placeholder="Seu Nome Completo" isRequired onValueChange={definirNome} value={nome} />

                                            <Input className="dark text-white" variant="bordered" label="Email" type="email" placeholder="seuemail@gmail.com" isRequired onValueChange={definirEmail} value={email} />

                                            <Input className="dark text-white" variant="bordered" label="Senha" type={senhaVisivel ? "text" : "password"} placeholder={senhaVisivel ? "sua senha" : "*******"} isRequired onValueChange={definirSenha} value={senha} isInvalid={erroDeSenha.erro} errorMessage={erroDeSenha.mensagemErro}
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


                                            <Input className="dark text-white" variant="bordered" label="Confirme sua Senha" type={confirmarSenhaVisivel ? "text" : "password"} placeholder={confirmarSenhaVisivel ? "sua senha" : "*******"} isRequired value={confirmarSenha} onValueChange={definirConfirmarSenha}
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

                                            <div >
                                                <p className='text-neutral-500 text-sm'>Sua senha deve conter:</p>
                                                <ul className='text-neutral-500 text-[10px]'>
                                                    <li>* Minimo de 8 Caracteres</li>
                                                    <li>* Minimo de 1 Caracter Maisculo</li>
                                                    <li>* Minimo de 1 Caracter Numerico</li>
                                                    <li>* Minimo de 1 Caracter Especial</li>
                                                </ul>
                                            </div>

                                        </>
                                    ) : (
                                        <>
                                            <Input className="dark text-white" variant="bordered" label="CPF" type="text" placeholder="Qual seu CPF?" isRequired onValueChange={formatarCPF} value={CPF} />

                                            <I18nProvider locale="pt-br">
                                                <DatePicker
                                                    showMonthAndYearPickers
                                                    variant="bordered"
                                                    className="max-w-md"
                                                    label="Data de Nascimento"
                                                    value={dataNascimento}
                                                    onChange={definirDataNascimento}
                                                    isInvalid={erroMaiorDeIdade}
                                                    errorMessage='É obrigatorio ter mais de 18 anos para entrar na plataforma'
                                                />
                                            </I18nProvider>
                                            <Checkbox color='success' isSelected={confirmaSerMaiorDeIdade} onValueChange={definirCorfirmacaoIdade}>
                                                <p className='text-sm text-neutral-400'>Confirmo ter mais de 18 anos</p>
                                            </Checkbox>
                                            <Checkbox color='success' isSelected={confirmaPreencherCorretamente} onValueChange={definirCofirmacaoDados}>
                                                <p className='text-sm text-neutral-400'>Confirmo ter preenchido corretamente todos os meus dados</p>
                                            </Checkbox>
                                            <Checkbox color='success' isSelected={confirmaOsTermos} onValueChange={definirConfirmacaoTermos}>
                                                <p className='text-sm text-neutral-400'>Aceito todos os <Link href='/'>Termos de Uso</Link> da plataforma</p>
                                            </Checkbox>
                                        </>
                                    )}

                                    {
                                        erroCamposVazios &&
                                        <div className='px-2 py-1 bg-red-700 text-white/60 font-bold text-center text-medium'>
                                            <p>Preencha todos os campos corretamente</p>
                                        </div>
                                    }

                                </ModalBody>
                                <ModalFooter>
                                    {etapaCadastro == 1 ? (
                                        <>
                                            <Button color="danger" variant="light" onClick={() => {
                                                definirErroCamposVazios(false)
                                                onClose()
                                            }}>
                                                Cancelar
                                            </Button>
                                            <Button color="success" onClick={() => proximaEtapa()}>
                                                Proximo
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button color="danger" variant="light" onClick={() => { definirEtapaCadastro(1) }}>
                                                Voltar
                                            </Button>
                                            <Button color="success" onClick={() => criarConta(onClose)}>
                                                Criar
                                            </Button>
                                        </>
                                    )}
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

                                    <Input className="dark text-white" variant="bordered" label="Email" type="email" placeholder="seuemail@gmail.com" isRequired onValueChange={definirEmail} />


                                    <Input className="dark text-white" variant="bordered" label="Senha" type={senhaVisivel ? "text" : "password"} placeholder={senhaVisivel ? "sua senha" : "*******"} isRequired onValueChange={definirSenha}
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

                                   

                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Cancelar
                                    </Button>
                                    <Button color="success" onClick={() => logar(onClose)}>
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
