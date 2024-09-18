'use client'

import { createClient } from "../utils/supabase/client" 
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown"
import { ChartPieSlice, PencilSimple, SignOut, UserCircle, Wallet } from "@phosphor-icons/react/dist/ssr"
import { useRouter } from "next/navigation"

function MenuUsuario({ dadosUsuario }) {
    const route = useRouter()

    const supabase = createClient()

    async function signOut() {
        await supabase.auth.signOut()
        route.push('/')
    }

    const alterarSenha = async () => {
        const { error } = await supabase
            .from('dados_usuarios')
            .update({ alterando_senha: Boolean(true) })
            .eq('id_usuario', dadosUsuario.id)
            .select()

        if (!error){
            await supabase.auth.resetPasswordForEmail(dadosUsuario.email, {
                redirectTo: process.env.NEXT_PUBLIC_URL_ALTERACAO_SENHA,
            })
        }
    }

    if (dadosUsuario && dadosUsuario.usuarioAutenticado) {
        return (
            <Dropdown className='dark'>
                <DropdownTrigger>
                    <UserCircle size={32} weight="fill" className='text-white' />
                </DropdownTrigger>
                <DropdownMenu>
                    <DropdownItem className='text-white' startContent={
                        <Wallet size={25} weight="duotone" />
                    }>
                        <a href="/autenticado/painel-usuario"> Perfil | Carteira</a>
                    </DropdownItem>

                    {dadosUsuario && dadosUsuario.administrador &&
                        <DropdownItem className='text-white' startContent={
                            <ChartPieSlice size={25} weight="duotone" />
                        }>
                            <a href="/autenticado/painel-adm"> Dashboard</a>
                        </DropdownItem>
                    }

                    <DropdownItem className='text-white' onPress={alterarSenha} startContent={
                        <PencilSimple size={25} weight="duotone" />
                    }>
                        Redefinir Senha
                    </DropdownItem>

                    <DropdownItem onPress={signOut} color='danger' className='text-white' startContent={
                        <SignOut size={25} weight="duotone" />
                    }>
                        Sair
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        )
    } else {
        return (
            <Dropdown className='dark'>
                <DropdownTrigger>
                    <UserCircle size={32} weight="fill" className='text-white' />
                </DropdownTrigger>
                <DropdownMenu>
                    <DropdownItem className='text-white'>
                        <a href="/auth/login">Entrar</a>
                    </DropdownItem>
                    <DropdownItem className='text-white'>
                        <a href='/auth/cadastro'>Cadastra-se</a>
                    </DropdownItem>

                </DropdownMenu>
            </Dropdown>
        )
    }
}

export default MenuUsuario