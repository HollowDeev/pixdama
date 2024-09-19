
import { Chip } from "@nextui-org/react";


function PaginaAviso() {


    return (
        <div className="w-full min-h-screen text-white text-center mt-10 gap-10 flex flex-col items-center">

            <div className="flex flex-col items-center ">
                <div className="text-stone-400">
                    <Chip variant="dot" color="success">Enviado</Chip>
                </div>
                <h1 className="text-2xl md:text-6xl font-bold bg-green-600 px-2 py-1 mt-5">Link de Confirmação</h1>
            </div>

            <p className="w-[300px] md:w-[600px]">Cadastro Feito com sucesso!!! Para finalizar, foi enviado um link de confirmação no email informado no cadastro. Confirme seu email clicando no botão de confirmação do email enviado</p>

            <Chip variant="flat" color="success">Estamos Ansioso para te-lo(a) conosco   : )</Chip>
        </div>
    );
}

export default PaginaAviso;
