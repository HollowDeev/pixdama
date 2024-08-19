'use client'

import { createClient } from "@/utils/supabase/client"


async function alterarSenha(email) {
    const supabase = createClient()
    await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'http://localhost:3000/alterar-senha',
      })
}

export default alterarSenha