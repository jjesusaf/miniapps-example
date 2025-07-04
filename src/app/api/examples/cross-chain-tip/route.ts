import { NextResponse } from "next/server";
import { createMetadata, ValidatedMetadata } from "@sherrylinks/sdk";
import { Metadata, TransferAction } from "@sherrylinks/sdk";
import { corsHeaders } from "@/app/api/cors/headers";


// 🟢 Acciones de transferencia
const actions: TransferAction[] = [
  {
    label: "Send 0.01 CELO",
    to: "0x5b1869D9A4C187F2EAa108f3062412ecf0526b24",
    chains: { source: 43113, destination: 43113 },
    type: "transfer",
    amountConfig: {
      label: "Amount",
      required: true,
      type: "select",
      options: [
        { label: "Small", value: 0.01, description: "0.01 AVAX" },
        { label: "Medium", value: 0.05, description: "0.05 AVAX" },
        { label: "Large", value: 0.1, description: "0.1 AVAX" },
      ]
    },
  },
  {
    label: "Send 5 CELO",
    to: "0x5b1869D9A4C187F2EAa108f3062412ecf0526b24",
    chains: { source: 43113, destination: 43113 },
    type: "transfer",
  },
];

// 🟢 Metadata de la mini app
const metadataOne: Metadata = {
  url: "https://sherry.social",
  icon: "https://i.postimg.cc/jdSs0w00/0-duq-Nfjiw38ov6-JEe.webp",
  title: "Send a Cross-Chain Tip – AVAX to CELO",
  description:
    "Show appreciation across networks! Enter the recipient’s CELO address and send a crypto tip from Avalanche to Celo in seconds.",
  actions: actions,
};

// 🟢 Manejo del método GET
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
