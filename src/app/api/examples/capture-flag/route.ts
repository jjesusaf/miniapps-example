import { NextResponse } from "next/server";
import {
  BlockchainActionMetadata,
  createMetadata,
  ValidatedMetadata,
} from "@sherrylinks/sdk";
import { Metadata } from "@sherrylinks/sdk";
import { abiCapture } from "@/app/api/abi/abiCapture";
import { corsHeaders } from "@/app/api/cors/headers";

const address = "0xFdC44664A0CcFa8Ed1a63ae6Be9Fb078297C0589";

const actions: BlockchainActionMetadata[] = [
  {
    label: "Capture for 0.01",
    type: "blockchain",
    address: address,
    abi: abiCapture,
    functionName: "canUserParticipate",
    chains: { source: 43113 },
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
  url: "https://sherry.social",
  icon: "https://kfrzkvoejzjkugwosqxx.supabase.co/storage/v1/object/public/images//CaptureFlag-Miniapp.png",
  title: "Capture the Flag – Compete and Win",
  description:
    "Be the best and capture the flag! Secure the flag by sending the required amount. The flag can be captured every 10 minutes. At the end of the week, the last holder wins the reward.",
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
