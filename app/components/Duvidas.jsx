'use client'

import { Accordion, AccordionItem } from "@nextui-org/accordion"

function Duvidas() {
    return (
        <div className="flex flex-col w-full">
            <p className="text-white font-bold text-xl">Tire suas Dúvidas:</p>
            <Accordion variant="bordered" isCompact>
                <AccordionItem title='Como posso ter certeza de que a plataforma é segura para realizar apostas?' key='1'>
                    <p className="text-white">Nossa plataforma utiliza tecnologia de criptografia de ponta para proteger todas as transações e dados dos usuários. Além disso, realizamos auditorias de segurança regularmente para garantir a integridade e a segurança do nosso sistema.</p>
                </AccordionItem>
                <AccordionItem title='Como são gerenciadas as minhas informações pessoais?' key='2'>
                    <p className="text-white">As suas informações pessoais são tratadas com o máximo sigilo e apenas são usadas para fins de operação e melhoria da plataforma. Não compartilhamos suas informações com terceiros sem o seu consentimento explícito.</p>
                </AccordionItem>
                <AccordionItem title=' Como posso garantir que as partidas são justas e sem trapaças?' key='3'>
                    <p className="text-white">Utilizamos algoritmos avançados e monitoramento contínuo para detectar e prevenir qualquer atividade suspeita ou trapaça. Além disso, todas as partidas são supervisionadas por moderadores para garantir a integridade do jogo.</p>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default Duvidas