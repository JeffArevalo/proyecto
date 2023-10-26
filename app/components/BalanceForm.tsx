'use client';
import React, { ChangeEvent, use, useState } from 'react'
import Select from 'react-select'

const Card = () => {
    const [cuenta, setCuenta] = useState('')
    const optionsCuentas = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' }
    ]
    const optionsCuenta = [
        { value: 'debe', label: 'Debe' },
        { value: 'heber', label: 'Haber' }
    ]

    return (
        <div className='border border-gray-300 rounded-md'>
            <div className="mb-16 grid gap-4 p-4 m-auto text-center lg:max-w-5xl lg:w-full lg:mb-4  lg:text-left">
                <h1 className={`mb-3 text-2xl font-bold`}>Partida doble</h1>
                <br />
                <form action="" className={`grid gap-8`}>
                    <label >Seleccione la cuenta:
                        <Select name="cuentas" options={optionsCuentas}></Select>
                    </label>

                    <label>Seleccione el tipo de monto: 
                        <Select options={optionsCuenta}></Select>
                    </label>
                    <label>
                        Ingrese la cantidad de la transaccion: $
                        <input type="number" name="monto" step={0.01} min={0} pattern="\d+(\.\d{2})?" />
                    </label>
                    <input type="button" value="Enviar" name='submit' />
                </form>

            </div>
        </div>
    )
}

export default Card