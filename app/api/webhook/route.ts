import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  if (body.event === "connection.update" && body.data?.status === "open") {
    const instanceId = body.instanceId;

    console.log(`Instância ${instanceId} conectada!`);
  }

  return NextResponse.json({ status: 200 });
}
