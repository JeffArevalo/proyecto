import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const cuentas = searchParams.get('Cuenta') || "";
        const categoria = searchParams.get('Categoria') || "";
        const fecha = searchParams.get('fecha') || new Date();
        const monto = searchParams.get('monto') || 0.00;
        const newCuenta = await prisma.balance.create({
            data: {
                cuenta: cuentas,
                tipo: categoria,
                fecha: fecha,
                monto: monto
            },
        });
        return NextResponse.json({ newCuenta }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}