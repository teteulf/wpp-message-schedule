"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Smartphone, Loader2 } from "lucide-react";
import { connectUazi } from "./services/conect-wpp";
import Image from "next/image";
import { createInstance } from "./services/create-instance";
import { conectWebhook } from "./services/conect-webhook";
import { socket } from "./frontserver/socket";

export default function ConnectWhatsapp() {
  const [phone, setPhone] = useState("");
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [instanceToken, setInstanceToken] = useState<string>("");

  const handleGenerateQR = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await connectUazi({ token: instanceToken });

      if (data.qrcode) {
        setQrCode(data.qrcode);
      } else {
        setError("Não foi possível obter o QR Code.");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao conectar com o servidor.",
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const initializeInstance = async () => {
      try {
        const dataInstance = await createInstance({
          name: "minha-instancia",
        });
        const token = dataInstance?.instance?.token;
        if (!token) {
          throw new Error("Token não veio da API");
        }
        setInstanceToken(dataInstance?.instance?.token || "");
        await conectWebhook({ token });
        console.log("Instância criada e webhook conectado com sucesso!");
      } catch (error) {
        console.error("Erro ao inicializar instância:", error);
      }
    };
    socket.on("connect", () => {
      console.log("🟢 conectado:", socket.id);
    });
    initializeInstance();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="w-5 h-5" />
            Conectar WhatsApp
          </CardTitle>
          <CardDescription>
            Insira o número com DDD para gerar o código de pareamento.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!qrCode ? (
            <div className="flex flex-col gap-4">
              <Input
                placeholder="Ex: 5511975231490"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={loading}
              />

              {error && <p className="text-xs text-red-500">{error}</p>}

              <Button
                onClick={handleGenerateQR}
                disabled={!phone || loading}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Gerando...
                  </>
                ) : (
                  "Gerar QR Code"
                )}
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border">
              <p className="text-sm font-medium mb-4 text-slate-600">
                Escaneie o código abaixo com seu WhatsApp:
              </p>
              <Image
                src={qrCode}
                alt="QR Code WhatsApp"
                width={64}
                height={64}
                className="w-64 h-64 border p-2 rounded-md shadow-sm"
              />

              <Button
                variant="outline"
                onClick={() => setQrCode(null)}
                className="mt-6 w-full"
              >
                Tentar outro número
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
