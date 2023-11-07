'use client';
import React from 'react'

async function getAllTransacccion() {
    await fetch('/transaccion/getAll', {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            for (const cuenta of data.balances) {
                console.log(cuenta)
            }
            return (`<a>${data}</a>`)
        })
        .catch((error) => {
            console.log(error)
        })
}


export default function Balance() {
    getAllTransacccion()
    return (
        <div className="space-y-12 max-w-3xl mx-auto mt-32">
            <div className="border border-gray-900/10 p-16">
            {getAllTransacccion}
            </div>
        </div>
    );
}
