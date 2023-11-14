'use client';
import { SetStateAction, useState } from 'react';
import Select from 'react-select'
import Swal from 'sweetalert2'
import Datepicker from "react-tailwindcss-datepicker";

const Card = () => {
    const optionsCuentas: any = [];
    const optionsMonto = [
        { value: 'debe', label: 'Debe' },
        { value: 'haber', label: 'Haber' }

    ]
    const [montoValue, setMontoValue] = useState("");
    const [value, setValue] = useState({ startDate: "" , endDate: "" });

    const handleValueChange = (newValue: any) => {
        console.log("newValue:", newValue);
        setValue(newValue);
    };

    function handleInputChange(event: { target: { value: SetStateAction<string>; }; }) {
        setMontoValue(event.target.value);
    }
    
    async function getAllCuentas() {
        await fetch('/cuentas/getAll', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                for (const cuenta of data.Cuentas) {
                    optionsCuentas.push({ value: cuenta.nombre, label: cuenta.nombre })
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }

    async function create(event: any) {
        event.preventDefault();
        const cuenta = document.querySelector("input[name='cuentas']")?.getAttribute("value");
        const categoria = document.querySelector("input[name='categoria']")?.getAttribute("value");
        let monto = document.querySelector("input[name='monto']")?.getAttribute("value");
        const date = new Date(value.startDate)
        const fechaISO = date.toISOString();
        console.log(fechaISO);
        console.log(monto);
        if (cuenta?.includes("IVA")){
            monto = (parseFloat(montoValue) * 0.13).toString()
        }
        console.log(categoria);
        console.log(cuenta)
        await fetch(`/transaccion/create?cuenta=${cuenta}&tipo=${categoria}&fecha=${fechaISO}&monto=${monto}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }

        })
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                Swal.fire(
                    'Transaccion Creada',
                    `La transaccion de la cuenta ${data.newCuenta.cuenta} fue creada con exito`,
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

    getAllCuentas()
    
    return (
        <form onSubmit={create}>
            <div className="space-y-12 max-w-3xl mx-auto mt-16">
                <div className="border border-gray-900/10 p-16">
                    <h1 className="font-bold">Transaccion</h1>

                    <div className="sm:col-span-4">
                        <label htmlFor="Cuenta" className="block text-sm font-medium leading-6 text-gray-900">Seleccione la cuenta:</label>
                        <div className="mt-2">
                            <Select id='cuentas' name="cuentas" options={optionsCuentas}></Select>
                        </div>
                    </div>

                    <div className="sm:col-span-4">
                        <label htmlFor="categoria" className="block text-sm font-medium leading-6 text-gray-900">Seleccione el tipo de monto:</label>
                        <div className="mt-2">
                            <Select name='categoria' options={optionsMonto}></Select>
                        </div>
                    </div>

                    <div className="sm:col-span-4">
                        <label htmlFor="fecha" className="block text-sm font-medium leading-6 text-gray-900">Seleccione la fecha:</label>
                        <div className="mt-2">
                            <Datepicker
                                useRange={false}
                                value={value}
                                onChange={handleValueChange}
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-4">
                        <label htmlFor="monto" className="block text-sm font-medium leading-6 text-gray-900">Ingrese la cantidad de la transaccion: $</label>
                        <div className="mt-2">
                            <input type="number" value={montoValue} onChange={handleInputChange} name="monto" step={0.01} min={0} pattern="\d+(\.\d{2})?" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900" >Cancel</button>
                        <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Card