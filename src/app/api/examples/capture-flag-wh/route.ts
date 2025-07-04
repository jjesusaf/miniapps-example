import { NextResponse } from "next/server";
import {
  BlockchainActionMetadata,
  createMetadata,
  ValidatedMetadata,
} from "@sherrylinks/sdk";

import { Metadata } from "@sherrylinks/sdk";
import { abiCapture } from "../../abi/abiCapture";
export const corsHeaders = {
  "Access-Control-Allow-Origin": "*", 
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
  "Content-Type": "application/json",
};
const address = "0x812810512193d623a68e467cc314511a581E4546";

const actions: BlockchainActionMetadata[] = [
  {
    label: "CAPTURE FOR 0.1",
    address: address,
    type: "blockchain",
    abi: abiCapture,
    functionName: "canUserParticipate",
    chains: { source: 43113, destination: 43113 },
    params: [
      {
        name: "_participant",
        label: "To",
        required: true,
        type: "address",
      },
    ],
  },
];
const metadataOne: Metadata = {
  url: "https://gnpoaqmajzwjdquzhqhk.supabase.co/storage/v1/object/sign/resources/flag.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJyZXNvdXJjZXMvZmxhZy5qcGciLCJpYXQiOjE3MzczMjA4OTYsImV4cCI6NDg1OTM4NDg5Nn0.jW1BTOFDs7dXL6CQysRT9q0rZ3bjElZl3sfcPjd7J5M&t=2025-01-19T21%3A08%3A16.813Z",
  icon: "https://i.postimg.cc/k5xWW6rf/wormhole-810x524.jpg",
  title: "Capture the flag Cross-Chain",
  description: "Be the Best and Capture the Flag",
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
