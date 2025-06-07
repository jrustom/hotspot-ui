import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

(window as any).global ||= window;

const CHAT_IDS = [100, 200];

const Test = () => {
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [input, setInput] = useState<Record<number, string>>({}); // one input per chat
  const [messages, setMessages] = useState<Record<number, string[]>>({}); // one message list per chat

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/stomp-ws');
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log('Connected to WebSocket');

        CHAT_IDS.forEach(chatId => {
          client.subscribe(`/chat/${chatId}/messages`, (message) => {
            setMessages(prev => ({
              ...prev,
              [chatId]: [...(prev[chatId] || []), message.body]
            }));
          });
        });
      },
      debug: str => console.log(str)
    });

    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
    };
  }, []);

  const sendMessage = (chatId: number) => {
    const message = input[chatId];
    if (stompClient && message?.trim()) {
      stompClient.publish({
        destination: `/server/${chatId}/message/send`, // dynamic send path
        body: JSON.stringify(message)
      });
      setInput(prev => ({ ...prev, [chatId]: '' }));
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      {CHAT_IDS.map(chatId => (
        <div key={chatId} style={{ marginBottom: '40px' }}>
          <h3>WebSocket Chat #{chatId}</h3>
          <input
            type="text"
            value={input[chatId] || ''}
            onChange={(e) =>
              setInput(prev => ({ ...prev, [chatId]: e.target.value }))
            }
            placeholder={`Message for chat ${chatId}`}
          />
          <button onClick={() => sendMessage(chatId)}>Send</button>
          <ul>
            {(messages[chatId] || []).map((msg, idx) => (
              <li key={idx}>{msg}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Test;
