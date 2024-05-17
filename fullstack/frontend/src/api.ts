export const API_URL = "https://showcase-fullstack-api.app.cloud.cbh.kth.se/";

export const uploadMessage = async (message: string) => {
  const response = await fetch(API_URL + "/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: message }),
  });
  if (!response.ok) {
    throw "Failed to upload message";
  }
};

export const fetchMessages = async () => {
  const response = await fetch(API_URL + "/");
  if (!response.ok) {
    throw "Failed to fetch messages";
  }
  return response.json();
};
