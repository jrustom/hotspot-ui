// here have a message model and we only need chat id, we have a backend endpoint which will get messages related to chat id private String id;

import { HotspotError } from "./accountService";

export interface Message {
  id: string;
  content: string;
  // we'll eclude this for simplicity as well
  // timeSent: string;
  senderId: string;
  // dont need chatid
}

export async function getMessages(
  chatID: string
): Promise<Message[] | HotspotError> {
  try {
    const response = await fetch(`http://localhost:8080/chats/${chatID}`, {
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
    console.log(messages);

    return messages;
  } catch (error) {
    return {
      message: "There was an error getting this chat's message.",
    };
  }
}
