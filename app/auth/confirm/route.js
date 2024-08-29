

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const token_hash = searchParams.get('token_hash')
    const type = searchParams.get('type')
    const next = searchParams.get('next') ?? '/'

    if (token_hash && type) {
        const supabase = createClient()

        const { error } = await supabase.auth.verifyOtp({
            type,
            token_hash,
        })

        if(error){
            redirect('/error?tipoErro=verificacao-email&tituloErro=Erro inesperado&mensagemErro=Ocorreu-um-erro-nao-esperado-por-favor-tente-novamente.-Se-o-erro-continuar-entre-em-contato-com-o-suporte-passando-o-tipo-do-erro')
        }

        if (!error) {
            const { data: user } = await supabase.auth.getUser();
            const userId = user.user.id;
            const userEmail = user.user.email

            // Recupera os dados temporários com base no e-mail
            const { data: tempData, error: tempError } = await supabase
                .from('dados_usuarios_temporario')
                .select('*')
                .eq('email', userEmail)
                .single();

            if (tempError || !tempData) {
                console.log(tempError);
                redirect('/error?tipoErro=dados-temporarios-verificacao&tituloErro=Erro inesperado&mensagemErro=Ocorreu-um-erro-nao-esperado-por-favor-tente-novamente.-Se-o-erro-continuar-entre-em-contato-com-o-suporte-passando-o-tipo-do-erro');

            } else {
                const { error } = await supabase
                    .from('dados_usuarios')
                    .insert([{
                        id_usuario: userId,
                        nome: tempData.nome,
                        data_nascimento: tempData.data_nascimento,
                        CPF: tempData.CPF,
                        aceitou_termos: tempData.aceitou_termos,
                        confirmou_idade: tempData.confirmou_idade,
                        confirmou_dados: tempData.confirmou_dados,
                        email: userEmail
                    }]);

                if (error) {
                    redirect('/error?tipoErro=cadastro-dados-definitivos&tituloErro=Erro inesperado&mensagemErro=Ocorreu-um-erro-nao-esperado-por-favor-tente-novamente.-Se-o-erro-continuar-entre-em-contato-com-o-suporte-passando-o-tipo-do-erro')
                } else {
                    // Remove os dados temporários
                    await supabase
                        .from('dados_usuarios_temporario')
                        .delete()
                        .eq('email', userEmail);

                    redirect(next);
                }
            }
        }
    }
}