'use client'

import { Input } from '@nextui-org/input'
import React, { Suspense, useState } from 'react'
import { signup } from '@/app/actions/auth'
import { Button } from '@nextui-org/button'
import { I18nProvider } from '@react-aria/i18n'
import { Checkbox, DatePicker } from '@nextui-org/react'
import { maior18 } from '@/app/actions/maior18'
import { parseDate } from '@internationalized/date'
import { Eye, EyeClosed } from '@phosphor-icons/react'
import { useSearchParams } from 'next/navigation'

function paginaCadastro() {
    

    const [nome, definirNome] = useState('')
    const [email, definirEmail] = useState('')
    const [senha, definirSenha] = useState('')
    const [confirmarSenha, definirConfirmarSenha] = useState('')
    const [CPF, definirCPF] = useState('')
    const [dataNascimento, definirDataNascimento] = useState(parseDate("2000-01-01"))
    const [dataFormatada, definirDataFormada] = useState('')
    const [confirmaSerMaiorDeIdade, definirCorfirmacaoIdade] = useState(false)
    const [confirmaPreencherCorretamente, definirCofirmacaoDados] = useState(false)
    const [confirmaOsTermos, definirConfirmacaoTermos] = useState(false)

    // Gerenciadores da visibilidade da senha
    const [senhaVisivel, definirSenhaVisivel] = useState(false)
    const [confirmarSenhaVisivel, definirConfirmarSenhaVisivel] = useState(false)

    const [erroDeSenha, definirErroDeSenha] = useState({
        erro: false,
        mensagemErro: ''
    })

    const [erroRegistro, definirErroRegistro] = useState({
        erro: false,
        mensagemErro: ''
    })

    const formatarData = (novaData) => {
        definirDataNascimento(novaData);

        // Formate a data ao mudar
        const { day, month, year } = novaData;
        const dataFormatada = `${day}/${month}/${year}`;
        definirDataFormada(dataFormatada);
    }

    const formatarCPF = (cpf) => {
        cpf = cpf.replace(/\D/g, '');

        cpf = cpf.substring(0, 11)

        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d)/, '$1/$2');
        cpf = cpf.replace(/(\d{2})(\d{1,2})$/, '$1-$2');

        definirCPF(cpf);
    }

    const cadastrar = (e) => {
        e.preventDefault();

        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (senha != confirmarSenha) {
            definirErroDeSenha({
                erro: true,
                mensagemErro: "As senhas digitadas são diferentes"
            })
        } else if (!regex.test(senha)) {
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

        const deMaior = maior18(dataNascimento)

        if (nome == '' || email == '' || senha == '' || confirmarSenha == '' || senha != confirmarSenha || CPF == '' || dataFormatada == "2000-01-01" || !confirmaPreencherCorretamente || !confirmaSerMaiorDeIdade) {
            definirErroRegistro({
                erro: true,
                mensagemErro: 'Preencha corretamente todos os dados'
            })
        } else if (!deMaior) {
            definirErroRegistro({
                erro: true,
                mensagemErro: 'É necessario ser maior de idade para se registrar na plataforma'
            })
        } else {
            definirErroRegistro({
                erro: false
            })
            e.target.submit();
        }


    };


    return (
        <div className='md:w-[400px] flex flex-col gap-5'>
            <div>
                <h1 className="font-bold text-2xl text-white">Bem Vindo ao Pix Dama!</h1>

                <p className="text-white">Vamos Jogar?</p>
            </div>
            <form action={signup} className='w-full2 flex flex-col gap-5' onSubmit={cadastrar}>
                <Input className="dark text-white" variant="bordered" label="Nome" type="text" placeholder="Seu Nome Completo" isRequired onValueChange={definirNome} value={nome} name='nome' />

                <Input className="dark text-white" variant="bordered" label="Email" type="email" placeholder="seuemail@gmail.com" isRequired onValueChange={definirEmail} value={email} name='email' />

                <Input className="dark text-white" variant="bordered" label="CPF" type="text" placeholder="Qual seu CPF?" name='cpf' isRequired onValueChange={formatarCPF} value={CPF} />

                <I18nProvider locale="pt-br">
                    <DatePicker
                        showMonthAndYearPickers
                        variant="bordered"
                        className="max-w-md"
                        label="Data de Nascimento"
                        value={dataNascimento}
                        onChange={formatarData}

                    />
                </I18nProvider>

                <input type="hidden" name="dataNascimento" value={dataFormatada} />

                <Checkbox color='success' isSelected={confirmaSerMaiorDeIdade} onValueChange={definirCorfirmacaoIdade} >
                    <p className='text-sm text-neutral-400'>Confirmo ter mais de 18 anos</p>
                </Checkbox>

                <input
                    type="hidden"
                    name="confirmaSerMaiorDeIdade"
                    value={confirmaSerMaiorDeIdade}
                />

                <Checkbox color='success' isSelected={confirmaPreencherCorretamente} onValueChange={definirCofirmacaoDados} >
                    <p className='text-sm text-neutral-400'>Confirmo ter preenchido corretamente todos os meus dados</p>
                </Checkbox>

                <input
                    type="hidden"
                    name="confirmaPreencherCorretamente"
                    value={confirmaPreencherCorretamente}
                />

                <Checkbox color='success' isSelected={confirmaOsTermos} onValueChange={definirConfirmacaoTermos} >
                    <p className='text-sm text-neutral-400'>Aceito todos os <a href='/termos' className='font-bold' target='_blank'>Termos de Uso</a> da plataforma</p>
                </Checkbox>

                <input
                    type="hidden"
                    name="confirmaOsTermos"
                    value={confirmaOsTermos}
                />

                <Input className="dark text-white" variant="bordered" label="Senha" type={senhaVisivel ? "text" : "password"} placeholder={senhaVisivel ? "sua senha" : "*******"} isRequired onValueChange={definirSenha} value={senha} isInvalid={erroDeSenha.erro} errorMessage={erroDeSenha.mensagemErro}
                    endContent={
                        <button onClick={() => definirSenhaVisivel(!senhaVisivel)} type='button'>
                            {senhaVisivel ?
                                <Eye size={20} weight="bold" />
                                :
                                <EyeClosed size={20} weight="bold" />
                            }
                        </button>
                    }
                    name='senha'
                />


                <Input className="dark text-white" variant="bordered" label="Confirme sua Senha" type={confirmarSenhaVisivel ? "text" : "password"} placeholder={confirmarSenhaVisivel ? "sua senha" : "*******"} isRequired value={confirmarSenha} onValueChange={definirConfirmarSenha}
                    endContent={
                        <button onClick={() => definirConfirmarSenhaVisivel(!confirmarSenhaVisivel)} type='button'>
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

                {erroRegistro.erro && (
                    <div className='px-2 py-1 bg-red-700 text-white/60 font-bold text-center text-medium'>
                        <p>{erroRegistro.mensagemErro}</p>
                    </div>
                )}
                <Suspense fallback='Carregando...'>
                    <Button color="success" type='submit'>
                        Entrar
                    </Button>
                </Suspense>
            </form>
        </div>
    )
}

export default paginaCadastro