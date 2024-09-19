'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '../utils/supabase/server' 

export async function login(formData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email'),
    password: formData.get('senha'),
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error && error.message == 'Invalid login credentials') {
    redirect('/auth/login?error=informacoes-de-login-invalidas')
  } else if (error) {
    redirect('/error?tipoErro=login&tituloErro=Erro inesperado&mensagemErro=Ocorreu-um-erro-nao-esperado-por-favor-tente-novamente.-Se-o-erro-continuar-entre-em-contato-com-o-suporte-passando-o-tipo-do-erro')
  } else {
    revalidatePath('/', 'layout')
    redirect('/')
  }
}

export async function signup(formData) {
  const supabase = createClient()

  const data = {
    nome: formData.get('nome'),
    email: formData.get('email'),
    cpf: formData.get('cpf'),
    dataNascimento: formData.get('dataNascimento'),
    confirmaSerMaiorDeIdade: formData.get('confirmaSerMaiorDeIdade'),
    confirmaPreencherCorretamente: formData.get('confirmaPreencherCorretamente'),
    confirmaOsTermos: formData.get('confirmaOsTermos'),
    password: formData.get('senha'),
  }

  const apenasNumero = data.cpf.replace(/\D/g, '');
  const CPF_Formatado = parseInt(apenasNumero, 10);

  let { data: dadosCPF } = await supabase
    .from('dados_usuarios')
    .select("*")
    .eq('CPF', CPF_Formatado)

  let { data: dadosEmail } = await supabase
    .from('dados_usuarios')
    .select("*")
    .eq('email', data.email)

  if (dadosCPF.length != 0 || dadosEmail.length != 0) {
    redirect('/error?tipoErro=usuario-existente&tituloErro=Usuario-Ja-Cadastrado&mensagemErro=Foi-encontrado-um-cadastro-para-o-email-ou-CPF-informado&urlRedirecionamento=/auth/cadastro')
  } else {

    const dataPrimitiva = {
      email: data.email,
      password: data.password
    }

    const { error: erroDadosTemp } = await supabase
      .from('dados_usuarios_temporario')
      .insert([{ email: data.email, nome: data.nome, data_nascimento: data.dataNascimento, CPF: CPF_Formatado, aceitou_termos: data.confirmaOsTermos, confirmou_idade: data.confirmaSerMaiorDeIdade, confirmou_dados: data.confirmaPreencherCorretamente }])

    if (erroDadosTemp) {

      redirect('/error?tipoErro=dados-temporarios&tituloErro=Erro inesperado&mensagemErro=Ocorreu-um-erro-nao-esperado-por-favor-tente-novamente.-Se-o-erro-continuar-entre-em-contato-com-o-suporte-passando-o-tipo-do-erro')

    } else {
      const { error } = await supabase.auth.signUp(dataPrimitiva)

      if (error) {

        await supabase
          .from('dados_usuarios_temporario')
          .delete()
          .eq('email', data.email);

        redirect('/error?tipoErro=usuario-existente&tituloErro=Usuario-Ja-Cadastrado&mensagemErro=Foi-encontrado-um-cadastro-para-o-email-ou-CPF-informado&urlRedirecionamento=/auth/cadastro')

      } else {
        revalidatePath('/', 'layout')
        redirect('/auth/aviso')
      }
    }



  }


}

