import { Button } from '@nextui-org/button'
import React from 'react'

function Header() {
    return (
        <div className='bg-gray-700 w-full h-16 flex items-center px-10 justify-between'>
            <p className='text-xl text-white'>PIX <span className='font-black text-gray-300'>Dama</span> </p>
            <nav className='flex gap-5'>
                <Button variant='shadow' className='bg-gray-100 text-black font-bold'>
                    Entrar
                </Button>
                <Button variant='light'  >
                    Cadastra-se
                </Button>
            </nav>
        </div>
    )
}

export default Header