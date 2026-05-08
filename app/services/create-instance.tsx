"use server";

interface CreateInstanceParams {
  name: string;
  systemName?: string;
  adminField01?: string;
  adminField02?: string;
}

export const createInstance = async ({
  name,
  systemName = "apilocal",
  adminField01 = "",
  adminField02 = "",
}: CreateInstanceParams) => {
  const url = "https://free.uazapi.com/instance/create";

  const adminToken = process.env.UAZAPI_ADMIN_TOKEN as string;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        admintoken: adminToken,
      },
      body: JSON.stringify({
        name,
        systemName,
        adminField01,
        adminField02,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Erro ao criar instância na UAZAPI");
    }

    return (console.log("Resposta da UAZAPI:", data), data);
  } catch (error) {
    console.error("Erro na UAZAPI:", error);
    throw error;
  }
};
