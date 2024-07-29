'use client'

import { createClient } from "@/utils/supabase/client"

export async function entrar(email, senha) {
    const supabase = createClient()
    
    let sucessoLogin = false
    let resposta = {}
    
    const data = {
      email: email,
      password: senha
    }

  
    const { error } = await supabase.auth.signInWithPassword(data)
  
    if (error) {
      sucessoLogin = false 
      resposta = {
        sucessoLogin,
        mensagem: error
      }
    } else {
      sucessoLogin = true 

      resposta = {
        sucessoLogin,
        mensagem: 'Login Realizado com sucesso'
      }
    }

    return resposta
    
}