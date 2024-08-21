import { createClient } from "@/utils/supabase/client"

export const verificarSessao = async () => {

    const supabase = createClient()

    let dadosUsuarios = {
        nome: '',
        email: '',
        administrador: false,
        totalVitorias: 0,
        usuarioAutenticado: false
    }

    const formatarNomeUsuario = (nomeCompleto) => {
        const nomes = nomeCompleto.trim().split(" ");

        let primeiroNome = nomes[0];

        primeiroNome = primeiroNome.charAt(0).toUpperCase() + primeiroNome.slice(1).toLowerCase();

        return primeiroNome;
    }

    const { data, error } = await supabase.auth.getUser()

    let usuarioAdministrador = false

    if (!error || data.user != null) {
        let emailUsuario = data.user.email

        let { data: dados_usuarios, error } = await supabase
            .from('dados_usuarios')
            .select("*")
            .eq('id_usuario', data.user.id)

        if (!error) {
            
            if (dados_usuarios[0].nivel_usuario == 2) {
                usuarioAdministrador = true
            }

            dadosUsuarios = {
                nome: formatarNomeUsuario(dados_usuarios[0].nome),
                email: emailUsuario,
                administrador: usuarioAdministrador,
                totalVitorias: dados_usuarios[0].numero_vitorias,
                usuarioAutenticado: true
            }
        } 

        console.error(error)
    }

    console.error(error)

    return dadosUsuarios
}