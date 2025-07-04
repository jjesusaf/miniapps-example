import { NextRequest, NextResponse } from 'next/server';
import { createMetadata, Metadata, ValidatedMetadata } from '@sherrylinks/sdk';
export async function GET(req: NextRequest) {
    try {
      // Obtener información de la URL del servidor
      const host = req.headers.get('host') || 'localhost:3000';
      const protocol = req.headers.get('x-forwarded-proto') || 'http';
  
      // Construir la URL base
      const serverUrl = `${protocol}://${host}`;
  
      // Construiremos el objeto metadata paso a paso abajo
    } catch (error) {
      console.error('Error creando metadata:', error);
      return NextResponse.json({ error: 'Error al crear metadata' }, { status: 500 });
    }
  }