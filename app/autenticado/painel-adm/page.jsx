
import { CrownSimple, Users, Wallet } from '@phosphor-icons/react/dist/ssr'
import { verificarSessao } from '../../actions/verificarSessao'
import { createClient } from '@/app/utils/supabase/server' 

async function painelAdm() {

    const supabase = createClient()

    let { data: dados_usuarios} = await supabase
        .from('dados_usuarios')
        .select('*')

    const numeroUsuarios = dados_usuarios.length

    const dados = await verificarSessao()

    return (
        <main className='flex min-h-screen flex-col items-center px-2 py-9 md:px-16 gap-5 text-white'>
            {dados.usuarioAutenticado && (
                <>
                    <div className='w-full flex items-center justify-between'>
                        <h1 className='font-black text-3xl'>Olá, {dados.nome}</h1>
                    </div>
                    <p className='font-bold mt-7 md:mt-10 md:text-2xl'>Dashboard</p>
                    <div className='w-full flex flex-col gap-2 md:flex-row'>
                        <div className='w-full md:w-auto grow py-6 px-4 border-stone-600 border-2 rounded-2xl flex items-center gap-5'>
                            <Users size={32} weight="duotone" />
                            <div>
                                <h2 className='font-bold text-xl'>Total de Usuarios</h2>
                                <p className='text-xl'>{numeroUsuarios}</p>
                            </div>
                        </div>
                        <div className='w-full md:w-auto grow py-6 px-4 border-stone-600 border-2 rounded-2xl flex items-center gap-5'>
                            <CrownSimple size={32} weight="duotone" />
                            <div>
                                <h2 className='font-bold text-xl'>Total de Partidas</h2>
                                <p className='text-xl'>0</p>
                            </div>
                        </div>
                        <div className='w-full md:w-auto grow py-6 px-4 border-stone-600 border-2 rounded-2xl flex items-center gap-5'>
                            <CrownSimple size={32} weight="duotone" />
                            <div>
                                <h2 className='font-bold text-xl'>Partidas do ultimo mês</h2>
                                <p className='text-stone-500 text-sm'>Partidas referente ao mês de agosto</p>
                                <p className='text-xl'>5</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex flex-col gap-2  md:flex-row'>
                        <div className='w-full py-6 px-4 md:w-auto grow border-stone-600 border-2 rounded-2xl flex items-center gap-5'>
                            <Wallet size={32} weight="duotone" />
                            <div>
                                <h2 className='font-bold text-xl'>Taxa total arrecadada</h2>
                                <p className='text-xl'>R$ 0,00</p>
                            </div>
                        </div>
                        <div className='w-full py-6 px-4 md:w-auto grow border-stone-600 border-2 rounded-2xl flex items-center gap-5'>
                            <Wallet size={32} weight="duotone" />
                            <div>
                                <h2 className='font-bold text-xl'>Taxa arrecadada mensal</h2>
                                <p className='text-stone-500 text-sm'>Calculo referente ao mês de agosto</p>
                                <p className='text-xl'>R$ 0,00</p>
                            </div>
                        </div>
                    </div>
                </>
            )}


        </main>

    )
}

export default painelAdm