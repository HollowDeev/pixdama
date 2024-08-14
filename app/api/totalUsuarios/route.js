import { createClient } from '@/utils/supabase/server'
import { headers } from 'next/headers'

export async function GET() {
    const authorization = headers().get('authorization')

    const supabase = createClient()

    let { data: dados_usuarios, error } = await supabase
        .from('dados_usuarios')
        .select('*')

    const numeroUsuarios = dados_usuarios.length

    return new Response(numeroUsuarios)
}