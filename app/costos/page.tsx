'use client'
import { SetStateAction, useState } from "react";

export default function Cuenta() {
    const [salarioValue, setSalarioValue] = useState("");
    const [vacacionesValue, setVacacionesValue] = useState("");
    const [vacacionesPorValue, setVacacionesPorValue] = useState("");
    const [aguinaldoValue, setAguinaldoValue] = useState("");
    const [eficienciaValue, setEficienciaValue] = useState("");
    const [active, setActive] = useState(false);


    const [Total, setTotal] = useState<any>({});

    function create(event: any) {
        event.preventDefault();
        setActive(true)
        const salario = parseFloat(salarioValue)
        const septimo = salario * 7
        const vac = parseFloat(vacacionesValue)
        const vacP = parseFloat(vacacionesPorValue)
        const vacaciones = (vac * salario + vacP/100 * vac * salario)/52 
        const agui = parseFloat(aguinaldoValue)
        const aguinaldo = (salario * agui)/52
        const seguro = (septimo + vacaciones) * (7.5/100)
        const afp = (septimo + vacaciones) * (7.75/100)
        const total = septimo + vacaciones + aguinaldo + seguro + afp
        const efi = parseFloat(eficienciaValue)
        const recargo = total / (salario * 5)
        const recargoEfi = total / (salario * 5 * (efi/100))

        setTotal({salario: format(septimo), vacaciones: format(vacaciones), aguinaldo: format(aguinaldo), seguro: format(seguro), afp: format(afp), total: format(total), recargo: format(recargo), recargoEfi: format(recargoEfi)})
    }
    function format(num: any) {
        return num.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    }

    function cancelar() {
        setSalarioValue("")
        setVacacionesValue("")
        setVacacionesPorValue("")
        setAguinaldoValue("")
        setEficienciaValue("")
    }

    function handleInputChange(event: { target: { value: SetStateAction<string>; }; }) {
        setSalarioValue(event.target.value);
    }

    function handleVacacionesChange(event: { target: { value: SetStateAction<string>; }; }) {
        setVacacionesValue(event.target.value);
    }

    function handleAguinaldoChange(event: { target: { value: SetStateAction<string>; }; }) {
        setAguinaldoValue(event.target.value);
    }

    function handleVacacionesPorChange(event: { target: { value: SetStateAction<string>; }; }) {
        setVacacionesPorValue(event.target.value);
    }

    function handleEficienciaChange(event: { target: { value: SetStateAction<string>; }; }) {
        setEficienciaValue(event.target.value);
    }

    return (
        <div className="space-y-12 max-w-3xl mx-auto mt-16 mb-16">
            <form onSubmit={create}>
                <div className="space-y-2 max-w-3xl mx-auto mt-4">
                    <div className="border border-gray-900/10 p-16">
                        <h1 className="font-bold">Calcular salario</h1>
                        <div className="sm:col-span-4">
                            <label htmlFor="salarioNominal" className="block text-sm font-medium leading-6 text-gray-900">Ingrese el salario nominal: $</label>
                            <div className="mt-2">
                                <input type="number" value={salarioValue} required onChange={handleInputChange} name="salarioNominal" step={0.01} min={0} pattern="\d+(\.\d{2})?" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="vacaciones" className="block text-sm font-medium leading-6 text-gray-900">Ingrese los dias de vacaciones: </label>
                            <div className="mt-2">
                                <input type="number" value={vacacionesValue} required onChange={handleVacacionesChange} name="vacaciones" step={1} min={0} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="porcentajeVacaciones" className="block text-sm font-medium leading-6 text-gray-900">Ingrese el porcentaje de recargo de las vacaciones: %</label>
                            <div className="mt-2">
                                <input type="number" value={vacacionesPorValue} onChange={handleVacacionesPorChange} name="porcentajeVacaciones" step={0.1} min={0} max={100} pattern="\d+(\.\d{2})?" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="aguinaldo" className="block text-sm font-medium leading-6 text-gray-900">Ingrese los dias de aguinaldo: </label>
                            <div className="mt-2">
                                <input type="number" value={aguinaldoValue} required onChange={handleAguinaldoChange} name="aguinaldo" step={1} min={0} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="porcentajeEficiencia" className="block text-sm font-medium leading-6 text-gray-900">Ingrese el porcentaje de eficiencia: %</label>
                            <div className="mt-2">
                                <input type="number" value={eficienciaValue} onChange={handleEficienciaChange} name="porcentajeEficiencia" step={1} min={0} max={100} pattern="\d+(\.\d{2})?" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={cancelar}>Cancel</button>
                            <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                        </div>
                    </div>
                </div>
            </form>

            {active ? (<table className="table border divide-y divide-gray-200 m-auto">
                <thead>
                    <tr>
                        <th className="px-6 py-4 text-left">Prestaciones</th>
                        <th className="px-6 py-4 text-left">Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="hover:bg-gray-100">
                        <td className="px-6 py-4">Septimo dia</td>
                        <td className="px-6 py-4">{Total.salario}</td>
                    </tr>

                    <tr className="hover:bg-gray-100">
                        <td className="px-6 py-4">Vacaciones semanales</td>
                        <td className="px-6 py-4">{Total.vacaciones}</td>
                    </tr>

                    <tr className="hover:bg-gray-100">
                        <td className="px-6 py-4">Aguinaldo semanal</td>
                        <td className="px-6 py-4">{Total.aguinaldo}</td>
                    </tr>

                    <tr className="hover:bg-gray-100">
                        <td className="px-6 py-4">Seguro social (ISSS) semanal</td>
                        <td className="px-6 py-4">{Total.seguro}</td>
                    </tr>

                    <tr className="hover:bg-gray-100">
                        <td className="px-6 py-4">AFP semanal</td>
                        <td className="px-6 py-4">{Total.afp}</td>
                    </tr>

                    <tr className="hover:bg-gray-100">
                        <td className="px-6 py-4">Salario total semanal</td>
                        <td className="px-6 py-4">{Total.total}</td>
                    </tr>
                    <tr className="hover:bg-gray-100">
                        <td className="px-6 py-4">Recargo semanal</td>
                        <td className="px-6 py-4">{Total.recargo}</td>
                    </tr>
                    <tr className="hover:bg-gray-100">
                        <td className="px-6 py-4">Recargo con eficiencia semanal</td>
                        <td className="px-6 py-4">{Total.recargoEfi}</td>
                    </tr>
                </tbody>
            </table>) : null}
        </div>
    )
}