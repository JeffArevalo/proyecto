'use client'
import { SetStateAction, useState } from "react";
import Swal from 'sweetalert2'

export default function Cuenta() {
    const [cuentaValue, setCuentaValue] = useState("");
    const [catValue, setCatValue] = useState("");
    async function create(event: any) {
        event.preventDefault();
        await fetch(`/cuentas/create?Cuenta=${cuentaValue}&Categoria=${catValue}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                Swal.fire(
                    'Cuenta Creada',
                    `La cuenta ${data.newCuenta.nombre} fue creada con exito`,
                    'success'
                )
            })
            .catch((error) => {
                console.log(error)
                Swal.fire(
                    'Error',
                    error,
                    'error'
                )
            });
    }
    async function cancelar() {
        setCuentaValue("")
        setCatValue("")
    }

    function handleCatChange(event: { target: { value: SetStateAction<string>; }; }) {
        setCatValue(event.target.value);
    }

    function handleInputChange(event: { target: { value: SetStateAction<string>; }; }) {
        setCuentaValue(event.target.value);
    }

    return (
        <form onSubmit={create}>
            <div className="space-y-12 max-w-3xl mx-auto mt-32">
                <div className="border border-gray-900/10 p-16">
                    <h1 className="font-bold">Crear una cuenta</h1>

                    <div className="sm:col-span-4">
                        <label htmlFor="Cuenta" className="block text-sm font-medium leading-6 text-gray-900">Ingrese el nombre de la cuenta:</label>
                        <div className="mt-2">
                            <input id="cuenta" name="Cuenta" type="text" value={cuentaValue} onChange={handleInputChange} required={true} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div className="sm:col-span-4">
                        <label htmlFor="categoria" className="block text-sm font-medium leading-6 text-gray-900">Ingrese el nombre de la categoria:</label>
                        <div className="mt-2">
                            <input id="categoria" name="Categoria" type="text" value={catValue} onChange={handleCatChange} required={true} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={cancelar}>Cancel</button>
                        <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                    </div>
                </div>
            </div>
        </form>
    )
}