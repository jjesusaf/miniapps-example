// src/app/api/miniapp/route.ts (o el archivo que estés usando)
import { NextResponse } from "next/server";
import { createMetadata, ValidatedMetadata } from "@sherrylinks/sdk";
import type { Metadata } from "@sherrylinks/sdk";
import { corsHeaders } from "@/app/api/cors/headers";


// 🟢 Metadata para la miniapp Swag Chat
const miniapp5: Metadata = {
  url: "http://swag-chat.cool",
  icon: "https://st2.depositphotos.com/6367796/9451/v/950/depositphotos_94511598-stock-illustration-pop-art-comics-icon-swag.jpg",
  title: "Chat with your friends with Swag 😎🤙🏻",
  description: "Send messages to your friends through blockchain but with Swag",
  baseUrl: "http://localhost:3000",
  actions: [
    {
      type: "dynamic",
      label: "Send Msg!",
      description: "Say something to your friend",
      chains: {
        source: 43113,
      },
      path: "/api/mi-app",
      params: [
        {
          name: "message",
          label: "Send a message like: It's a good day to buy bitcoin, bro!",
          type: "textarea",
          required: true,
          description: "Write with your heart here",
        },
        {
          name: "address",
          label: "Your friend address, starts with 0x...",
          type: "text",
          required: true,
          description: "Wallet address",
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
