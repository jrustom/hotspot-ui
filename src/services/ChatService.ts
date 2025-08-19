// here have a message model and we only need chat id, we have a backend endpoint which will get messages related to chat id private String id;

import { User } from "@/contexts/AuthContext";
import { HotspotError } from "./accountService";

export interface Message {
  id: string;
  content: string;
  senderId: string;
  senderUsername: string;
}

export async function getSender(userId: string): Promise<User | HotspotError> {
  try {
    const url = import.meta.env.VITE_BASE_URL;
    const response = await fetch(`${url}/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return error;
    }

    return await response.json();
  } catch (error) {
    return {
      message: "Error getting sender of messages.",
    };
  }
}

export async function getMessages(
  chatID: string
): Promise<Message[] | HotspotError> {
  try {
    const url = import.meta.env.VITE_BASE_URL;
    const response = await fetch(`${url}/chats/${chatID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
