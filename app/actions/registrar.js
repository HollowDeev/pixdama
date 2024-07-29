'use client'

import { createClient } from "@/utils/supabase/client"

export async function cadastro(nome, email, senha, CPF, dataFormatada, confirmaOsTermos, confirmaPreencherCorretamente, confirmaSerMaiorDeIdade) {
  const supabase = createClient()

  let sucessoCadastro = false
  let resposta = {}

  const data = {
    email: email,
    password: senha
  }


  const { error } = await supabase.auth.signUp(data)

  if (error) {
    console.log('1')
    sucessoCadastro = false
    resposta = {
      sucessoCadastro,
      mensagem: error
    }
  } else {

    const { data: user } = await supabase.auth.getUser()
    const userId = user.user.id;

    const apenasNumero = CPF.replace(/\D/g, '');
    const CPF_Formatado = parseInt(apenasNumero, 10);

    const { error} = await supabase
      .from('dados_usuarios')
      .insert([{ id_usuario: userId, nome: nome, data_nascimento: dataFormatada, CPF: CPF_Formatado, aceitou_termos: confirmaOsTermos, confirmou_idade: confirmaSerMaiorDeIdade, confirmou_dados: confirmaPreencherCorretamente }])

    if (error) {
      sucessoCadastro = false
      resposta = {
        sucessoCadastro,
        mensagem: error
      }
    } else {
      sucessoCadastro = true
      resposta = {
        sucessoCadastro,
        mensagem: 'Usuario Cadastrado com sucesso'
      }
    }



  }

  return resposta

}