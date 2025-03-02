import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { message: 'Não autorizado' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { type, description, location, latitude, longitude } = body;

    // Validações básicas
    if (!type || !description || !location || !latitude || !longitude) {
      return NextResponse.json(
        { message: 'Dados incompletos' },
        { status: 400 }
      );
    }

    // Criar o alerta
    const alert = await prisma.alert.create({
      data: {
        type,
        description,
        location,
        latitude,
        longitude,
        status: 'ACTIVE',
        creatorId: session.user.id
      }
    });

    return NextResponse.json(alert, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar alerta:', error);
    return NextResponse.json(
      { message: 'Erro ao criar alerta' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const type = searchParams.get('type');

    let where = {};
    if (status) {
      where = { ...where, status };
    }
    if (type) {
      where = { ...where, type };
    }

    const alerts = await prisma.alert.findMany({
      where,
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            role: true
          }
        },
        responses: {
          include: {
            responder: {
              select: {
                id: true,
                name: true,
                role: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(alerts);
  } catch (error) {
    console.error('Erro ao buscar alertas:', error);
    return NextResponse.json(
      { message: 'Erro ao buscar alertas' },
      { status: 500 }
    );
  }
} 