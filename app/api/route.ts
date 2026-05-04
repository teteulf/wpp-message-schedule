import { NextResponse } from "next/server";
import { sendUazMessage } from "@/app/services/send-message";

export async function POST(request: Request) {
  try {
    const { number, text } = await request.json();

    if (!number || !text) {
      return NextResponse.json(
        { error: "Número e texto são obrigatórios" },
        { status: 400 },
      );
    }

    const result = await sendUazMessage({ number, text });

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Erro interno no servidor" },
      { status: 500 },
    );
  }
}
