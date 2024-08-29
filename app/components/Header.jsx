
import { Button } from '@nextui-org/button'
import Link from 'next/link'
import { verificarSessao } from '../actions/verificarSessao'
import MenuUsuario from './MenuUsuario'

export default async function Header() {

  const dados = await verificarSessao()

  return (
    <>
      <div className='bg-gray-700 w-full h-16 flex items-center px-4 justify-between'>
        <Link href="/" className='cursor-pointer'>
          <p className='text-xl text-white '>PIX <span className='font-black text-gray-300'>Dama</span> </p>
        </Link>
        <div className='hidden md:flex'>
          {
            dados.usuarioAutenticado ?
              (
                <MenuUsuario dadosUsuario={dados} />
              )
              :
              <nav className='flex gap-5'>
                <Button variant='shadow' className='bg-gray-100 text-black font-bold' >
                  <a href="/auth/login">Entrar</a>
                </Button>
                <Button variant='light' >
                  <a href='/auth/cadastro'>Cadastra-se</a>
                </Button>
              </nav>
          }
        </div>
        <div className='md:hidden'>
          <MenuUsuario administrador={dados.administrador} autenticado={dados.usuarioAutenticado} />
        </div>
      </div>

    </>
  )
}