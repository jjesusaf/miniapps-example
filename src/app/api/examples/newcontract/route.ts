import { NextResponse } from "next/server";
import {
  BlockchainActionMetadata,
  createMetadata,
  ValidatedMetadata,
} from "@sherrylinks/sdk";

import { Metadata } from "@sherrylinks/sdk";
import { abiCapture } from "../../abi/abiCapture";
import { corsHeaders } from "@/app/api/cors/headers";

const address = "0x11C2420efB5e03Dc75F8809d7f5bB47816De96F8";

const actions: BlockchainActionMetadata[] = [
  {
    label: "CAPTURE FOR 0.1",
    address: address,
    type: "blockchain",
    abi: abiCapture,
    functionName: "captureFlag",
    chains: { source: 43113, destination: 43113 },
    amount: 0.1,
    params: [
      {
        name: "_participant",
        label: "To",
        value: "sender",
        required: true,
        type: "address",
      },
    ],
  },
];
const metadataOne: Metadata = {
  url: "https://gnpoaqmajzwjdquzhqhk.supabase.co/storage/v1/object/sign/resources/flag.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJyZXNvdXJjZXMvZmxhZy5qcGciLCJpYXQiOjE3MzczMjA4OTYsImV4cCI6NDg1OTM4NDg5Nn0.jW1BTOFDs7dXL6CQysRT9q0rZ3bjElZl3sfcPjd7J5M&t=2025-01-19T21%3A08%3A16.813Z",
  icon: "https://i.postimg.cc/k5xWW6rf/wormhole-810x524.jpg",
  title: "New Contract",
  description: "New Contract",
  actions: actions,
};




export async function GET() {
  try {
    const metadataResponse: ValidatedMetadata = createMetadata(metadataOne);
    return NextResponse.json(metadataResponse, {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create metadata" }, {
      status: 500,
      headers: corsHeaders,
    });
  }
}

export function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}
