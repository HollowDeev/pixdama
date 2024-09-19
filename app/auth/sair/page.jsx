'use server'

import { createClient } from "@/app/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"


async function sair() {

    const supabase = createClient()

    await supabase.auth.signOut()

    revalidatePath('/', 'layout')
    redirect('/')

    return (
        <>
            
        </>
    )
}

export default sair