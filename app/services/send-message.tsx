"use server";

interface SendMessageParams {
  number: string;
  text: string;
}

export const sendUazMessage = async ({ number, text }: SendMessageParams) => {
  const url = "https://free.uazapi.com/send/text";
  const token = process.env.UAZAPI_TOKEN as string;
  console.log(
    "Tentando enviar com token:",
    token ? "Token encontrado" : "Token vazio/undefined",
  );

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify({
      number,
      text,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erro ao enviar mensagem via UAZAPI");
  }

  return await response.json();
};
