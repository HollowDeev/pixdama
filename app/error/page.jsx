'use client'

import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function ErrorComponent() {
    const searchParams = useSearchParams();

    const [erro, definirErro] = useState({
        tipoErro: '',
        tituloErro: '',
        mensagemErro: '',
        url: '/'
    });

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const mensagemErro = searchParams.get('mensagemErro');
        const tipoErro = searchParams.get('tipoErro');
        const tituloErro = searchParams.get('tituloErro');
        const urlRedirecionamento = searchParams.get('urlRedirecionamento')

        if (mensagemErro && tipoErro && tituloErro) {

            definirErro({
                tipoErro: tipoErro.replace(/-/g, ' '),
                tituloErro: tituloErro.replace(/-/g, ' '),
                mensagemErro: mensagemErro.replace(/-/g, ' '),
                url: urlRedirecionamento ? urlRedirecionamento : '/'
            });
        }

        setLoading(false);
    }, [searchParams]);



    return (
        <div className="w-full min-h-screen text-white text-center mt-10 gap-10 flex flex-col items-center">

            {!loading && (
                <>
                    <div className="flex flex-col items-center ">
                        <div className="text-stone-400">
                            <p>Erro do tipo: <Chip variant="dot" color="danger">{erro.tipoErro}</Chip></p>
                        </div>
                        <h1 className="text-5xl font-bold">{erro.tituloErro}</h1>
                    </div>
                    <p>{erro.mensagemErro}</p>

                    <Link href={erro.url}>
                        <Button className="bg-red-700" >
                           Retornar
                        </Button>
                    </Link>
                </>
            )}

        </div>
    );
}

export default ErrorComponent;
