// services/uazi-actions.ts
"use server";

export const connectUazi = async ({ token }: { token: string }) => {
  const url = "https://free.uazapi.com/instance/connect";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({}),
    });

    const data = await response.json();
    console.log("Resposta da UAZAPI:", data);

    if (!response.ok) {
      throw new Error(data.message || "Erro ao conectar");
    }

    return {
      qrcode: data.instance?.qrcode || "",
      status: data.instance?.status || "unknown",
      success: true,
    };
  } catch (error: Error | any) {
    return { success: false, error: error.message };
  }
};
