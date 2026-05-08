export const conectWebhook = async ({ token }: { token: string }) => {
  const url = "https://free.uazapi.com/webhook";
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      token: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      enabled: true,
      url: "https://504d-2804-7f0-9543-e68c-bdf3-6ff9-a877-900d.ngrok-free.app/api/webhook",
      events: ["connection"],
      excludeMessages: ["wasSentByApi"],
    }),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
