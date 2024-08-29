'use client'

import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"

function TabelaTransacoes() {
    return (
        <Table aria-label="Example static collection table" removeWrapper>
            <TableHeader>
                <TableColumn>DATA</TableColumn>
                <TableColumn>TIPO</TableColumn>
                <TableColumn>VALOR</TableColumn>
                <TableColumn>SALDO</TableColumn>
            </TableHeader>
            <TableBody>
                <TableRow key="1">
                    <TableCell>12/08/2024</TableCell>
                    <TableCell>Deposito</TableCell>
                    <TableCell>R$ 50,00</TableCell>
                    <TableCell>R$ 100,00</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

export default TabelaTransacoes