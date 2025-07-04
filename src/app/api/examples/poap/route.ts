import { NextResponse } from "next/server";
import {
  BlockchainActionMetadata,
  createMetadata,
  ValidatedMetadata,
} from "@sherrylinks/sdk";
import { Metadata } from "@sherrylinks/sdk";
import { abiPoapRegister } from "../../abi/abiPoapRegister";
import { corsHeaders } from "@/app/api/cors/headers";

const address = "0x3449afc2fCF3D51DC892658f0c69E47286B078d4";

const actions: BlockchainActionMetadata[] = [
  {
    label: "Join the Raffle",
    address: address,
    abi: abiPoapRegister,
    functionName: "registerUser",
    type: "blockchain",
    chains: { source: 43113, destination: 43113 },
    params: [
      {
        name: "_user",
        label: "To",
        required: true,
        type: "address",
        value: "sender",
      },
    ],
  },
];
const metadataOne: Metadata = {
  url: "https://sherry.social",
  icon: "https://kfrzkvoejzjkugwosqxx.supabase.co/storage/v1/object/public/images//ETHDevnerRaffle-Miniapp.png", // dev: change this image after uloading the original
  title: "NFC Quest: Scan, Mint & Win at ETHDenver",
  description:
    "Found me at ETHDenver? Enter your wallet address to verify your POAP and join the $500 USDC raffle! Five winners will be selected",
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
