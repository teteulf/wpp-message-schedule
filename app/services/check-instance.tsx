export const checkInstanceStatus = async () => {
  const url = "https://free.uazapi.com/instance/status";
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      token: "5bde24ca-7b1b-4c48-bffe-4822268834d6",
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    return {
      statusInstance: data.instance?.status,
    };
  } catch (error) {
    console.error(error);
  }
};
