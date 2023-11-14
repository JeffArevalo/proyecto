'use client';
import React, { useEffect, useState } from 'react'

export default function Balance() {
    type Transacciones = {
        id: any
        cuenta: string
        fecha: string
        tipo: string
        monto: string
    }
    const [Transaccion, setTransaccion] = useState<Transacciones[]>([]);
    const [debeMonto, setDebeMonto] = useState(0.00)
    const [haberMonto, setHaberMonto] = useState(0.00)

    async function getAllTransacccion() {
        await fetch('/transaccion/getAll', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                const transac = []
                for (const balance of data.balances) {
                    const fecha = new Date(balance.fecha).toLocaleDateString('es-ES');
                    const monto = parseFloat(balance.monto);
                    const tipo = balance.tipo;
                    if(tipo == "debe")
                        setDebeMonto(prevCount => prevCount  + monto)
                    else
                        setHaberMonto(prevCount => prevCount + monto)

                    transac.push({ id: balance.id, cuenta: balance.cuenta, fecha: fecha, tipo: tipo, monto: monto.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) })
                }
                setTransaccion(transac)
                console.log(Transaccion)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getAllTransacccion()
    }, [])

    return (
        <div className="space-y-12 max-w-3xl mx-auto mt-16">
            <div className="border border-gray-900/10 p-16">
                <table className="table border divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-6 py-4 text-left">Fecha</th>
                            <th className="px-6 py-4 text-left">Cuenta</th>
                            <th className="px-6 py-4 text-left">Debe</th>
                            <th className="px-6 py-4 text-left">Haber</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Transaccion.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="px-6 py-4">{item.fecha}</td>
                                <td className="px-6 py-4">{item.cuenta}</td>
                                {item.tipo == "debe" ?
                                    (
                                    <td className="px-6 py-4">{item.monto}</td>
                                    ) : (<td className="px-6 py-4"></td>)
                                }
                                {item.tipo == "haber" ?
                                    (
                                    <td className="px-6 py-4">{item.monto}</td>
                                    ) : (<td className="px-6 py-4"></td>)
                                }
                                
                            </tr>
                        ))}
                        <tr className="hover:bg-gray-100">
                                <th className="px-6 py-4">TOTAL</th>
                                <td className="px-6 py-4"></td>
                                <td className="px-6 py-4">{(debeMonto/2).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                                <td className="px-6 py-4">{(haberMonto/2).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                            </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
