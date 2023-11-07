import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const cuenta = searchParams.get('Cuenta') || "";
        const categoria = searchParams.get('Categoria') || "";
        const newCuenta = await prisma.cuenta.create({
            data: {
                nombre: cuenta,
                categoria: categoria,
            },
        });
        return NextResponse.json({ newCuenta }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}