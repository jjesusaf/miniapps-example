import { NextResponse } from "next/server";
import { createMetadata, ValidatedMetadata } from "@sherrylinks/sdk";
import { Metadata, TransferAction } from "@sherrylinks/sdk";
import { corsHeaders } from "@/app/api/cors/headers";

const actions: TransferAction[] = [
  
  {
    label: "Buy a Custom Coffee in AVAX",
    chains: { source: 43113, destination: 43113 },
    type: "transfer",
    recipient: {
      label: "Selection with Jesus or Karla",
      required: true,
      type: "select",
      defaultValue: "0x0Cfa7c62dcD0f04CcD2253df371eE035B5ef3a5f",
      options: [
        {
          label: "Jesus Wallet",
          value: "0x0Cfa7c62dcD0f04CcD2253df371eE035B5ef3a5f",
        },
        {
          label: "Karla Wallet",
          value: "0x4b01E229bae6745F834726eCA260AD2665606717",
        },
      ],
    },
    amountConfig: {
      label: "Amount",
      required: true,
      type: "radio",
      options: [
        { label: "Small", value: 0.01, description: "0.01 AVAX" },
        { label: "Medium", value: 0.05, description: "0.05 AVAX" },
        { label: "Large", value: 0.1, description: "0.1 AVAX" },
      ],
    },
  },
  {
    label: "Buy A MUSGO",
    chains: { source: 43113 },
    type: "transfer",
    to: "0x4b01E229bae6745F834726eCA260AD2665606717",
    amountConfig: {
      label: "Amount",
      required: true,
      type: "select",
      options: [
        { label: "Small", value: 0.01, description: "0.01 AVAX" },
        { label: "Medium", value: 0.05, description: "0.05 AVAX" },
        { label: "Large", value: 0.1, description: "0.1 AVAX" },
      ],
    },
  },
  {
    label: "Buy a Custom Coffee in AVAX",
    chains: { source: 43113 },
    type: "transfer",
    recipient: {
      label: "Selection with Jesus or Karla",
      required: true,
      type: "select",
      options: [
        {
          label: "Jesus Wallet",
          value: "0x0Cfa7c62dcD0f04CcD2253df371eE035B5ef3a5f",
        },
        {
          label: "Karla Wallet",
          value: "0x0Cfa7c62dcD0f04CcD2253df371eE035B5ef3a5f",
        },
      ],
    },
    amountConfig: {
      label: "Amount",
      required: true,
      type: "radio",
      options: [
        { label: "Small", value: 0.01, description: "0.01 AVAX" },
        { label: "Medium", value: 0.05, description: "0.05 AVAX" },
        { label: "Large", value: 0.1, description: "0.1 AVAX" },
      ],
    },
  },
  {
    label: "BUY BUY BUY",
    chains: { source: 43113 },
    type: "transfer",
    to: "0x5b1869D9A4C187F2EAa108f3062412ecf0526b24",
    amount: 0.01,
  
  },
];
const metadataOne: Metadata = {
  url: "https://sherry.social",
  icon: "https://nklhrkudpcslfcyoeozs.supabase.co/storage/v1/object/public/example//mini2.png",
  title: "Buy Me a Coffee – Support with AVAX",
  description:
    "Fuel my creativity with a quick AVAX tip. Choose a coffee size or enter a custom amount.",
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
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}

export function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}
