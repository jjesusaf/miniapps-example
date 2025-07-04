// src/app/api/miniapp/route.ts (o el archivo que estés usando)
import { NextResponse } from "next/server";
import { createMetadata, ValidatedMetadata } from "@sherrylinks/sdk";
import type { Metadata } from "@sherrylinks/sdk";
import { corsHeaders } from "@/app/api/cors/headers";


// 🟢 Metadata para la miniapp Swag Chat
const miniapp5: Metadata = {
  url: "https://sherry.social",
  icon: "https://avatars.githubusercontent.com/u/117hh962315",
  title: "Mensaje con Timestamp de Jesus",
  description:
    "Almacena un mensaje con un timestamp optimizado calculado por nuestro algoritmo",
  baseUrl: "https://minithon-gamma.vercel.app",
  actions: [
    {
      type: "dynamic",
      label: "Envia un mensaje",
      description:
        "Almacena tu mensaje con un timestamp personalizado calculado para almacenamiento óptimo",
      chains: {
        source: 43113,
      },
      path: "/api/example",
      params: [
        {
          name: "mensaje",
          label: "¡Tu Mensaje Hermano!",
          type: "select",
          options: [
            { label: "Option 1", value: "option1", description: "Option 1" },
            { label: "Option 2", value: "option2", description: "Option 2" },
          ],
          required: true,
          description:
            "Ingresa el mensaje que quieres almacenar en la blockchain",
        },
      ],
    },
  ],
};

// 🟢 Manejo del método GET
export async function GET() {
  try {
    const metadataResponse: ValidatedMetadata = createMetadata(miniapp5);
    return NextResponse.json(metadataResponse, {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create metadata" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// 🟢 Manejo del método OPTIONS para preflight
export function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}
