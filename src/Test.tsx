import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
(window as any).global ||= window;



const Test = () => {
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<String[]>([]);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/stomp-ws');
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log('Connected to WebSocket');

        // Subscribe to /chat
        client.subscribe('/chat/messages', (message) => {
         
        //   const msg = JSON.parse(message.body);
          setMessages((prev) => [...prev, message.body]);
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

  const sendMessage = () => {
    if (stompClient && input.trim()) {
      
      stompClient.publish({
        destination: '/server/message', // Send to /server
        body: JSON.stringify(input)
      });
      setInput('');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>WebSocket Chat</h3>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
      <ul>
        {messages.map((msg, idx) => (
          <li key={idx}><strong></strong> {msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default Test;
