'use client'

import { Input } from '@nextui-org/input'
import React, { useEffect, useState } from 'react'
import { login } from '@/app/actions/auth'
import { Button } from '@nextui-org/button'
import { Eye, EyeClosed } from '@phosphor-icons/react'
import { useSearchParams } from 'next/navigation'

function paginaLogin() {

  const searchParams = useSearchParams()

  const [email, definirEmail] = useState('')
  const [senha, definirSenha] = useState('')

      // Gerenciadores da visibilidade da senha
  const [senhaVisivel, definirSenhaVisivel] = useState(false)

  const [erroLogin, definirErroLogin] = useState({
    erro: false,
    mensagemErro: ''
  })

  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      definirErroLogin({
        erro: true,
        mensagemErro: errorParam.replace(/-/g, ' ')
      });
    }
  }, [searchParams]);

  return (
    <div className='md:w-[400px] flex flex-col gap-5'>
      <div>
        <h1 className="font-bold text-2xl text-white">Bem Vindo ao Pix Dama!</h1>

        <p className="text-white">Vamos Jogar?</p>
      </div>
      <form action={login} className='w-full2 flex flex-col gap-5'>
        <Input className="dark text-white" variant="bordered" label="Email" type="email" placeholder="seuemail@gmail.com" isRequired onValueChange={definirEmail} value={email} name='email' />


        <Input className="dark text-white" variant="bordered" label="Senha" type={senhaVisivel ? "text" : "password"} placeholder={senhaVisivel ? "sua senha" : "*******"} isRequired onValueChange={definirSenha} value={senha}
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

        {erroLogin.erro && (
          <div className='px-2 py-1 bg-red-700 text-white/60 font-bold text-center text-medium'>
            <p>{erroLogin.mensagemErro}</p>
          </div>
        )}


        <Button color="success" type='submit'>
          Entrar
        </Button>
      </form>
    </div>
  )
}

export default paginaLogin