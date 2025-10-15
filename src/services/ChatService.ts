import { HotspotError } from "./accountService";

export interface Message {
  id: string;
  content: string;
  senderUsername: string;
}

export async function getMessages(
  chatID: string
): Promise<Message[] | HotspotError> {
  try {
    const url = import.meta.env.VITE_BASE_URL;
    const token = localStorage.getItem("jwt");

    const response = await fetch(`${url}/chats/${chatID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return error;
    }

    const messages: Message[] = await response.json();
    return messages;
  } catch (error) {
    return {
      message: "There was an error getting this chat's message.",
    };
  }
}
