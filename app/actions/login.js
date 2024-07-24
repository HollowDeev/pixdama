'use client'

import { createClient } from "@/utils/supabase/client"

export async function login(email, senha) {
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

      const { data: {session }} = await supabase.auth.getSession()

      resposta = {
        sucessoLogin,
        mensagem: 'Login Realizado com sucesso'
      }
    }

    return resposta
    
}