import { getMessages, Message } from "@/services/ChatService";
import { Client } from "@stomp/stompjs";
import { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";

function ChatComponent({
  chatId,
  setChatActive,
}: {
  chatId: string;
  setChatActive: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const socketURL = import.meta.env.VITE_WS_STOMPJS_URL;

  const clientPrefix = import.meta.env.VITE_WS_CLIENT_PREFIX;
  const clientURL = import.meta.env.VITE_WS_CLIENT_URL;
  const serverPrefix = import.meta.env.VITE_WS_SERVER_PREFIX;

  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [input, setInput] = useState<string>(""); // single input for this chat
  const [messages, setMessages] = useState<Message[]>(Array());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setChatActive(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Auto-scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // TODO: make sure to understand each thing going on here and
  // make sure the behaviour is what you're looking for
  useEffect(() => {
    const socket = new SockJS(socketURL);
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log(`Connected to WebSocket for chat: ${chatId}`);

        client.subscribe(
          `${clientPrefix}/${chatId}/${clientURL}`,
          (message) => {
            console.log(`Received message for chat ${chatId}:`, message.body);
            try {
              const parsedMessage = JSON.parse(message.body);
              setMessages((prev) => [...prev, parsedMessage]);
            } catch (error) {
              console.error("Error parsing message:", error, message.body);
            }
          }
        );
        console.log(`Subscribed to: ${clientPrefix}/${chatId}/${clientURL}`);
      },
      debug: (str) => console.log(str),
    });

    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
    };
  }, []);

  useEffect(() => {
    try {
      getMessages(chatId).then((response) => {
        if ("message" in response) {
          console.log(response);
        } else {
          setMessages(response);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const sendMessage = () => {
    if (stompClient && input.trim()) {
      const destination = `${serverPrefix}/${chatId}/message/send`;
      console.log(`Sending message to: ${destination}`, input);
      stompClient.publish({
        destination: destination,
        body: JSON.stringify({ content: input, senderID: 100 }),
      });
      setInput("");
    }
  };

  // its here that we will iterate over each message, and if the sendid of that message matches the one in context, then we know its ours and we put it on the right side, otherwise it goes on the left side

  return (
    <>
      {/* {messages.length <= 0 ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <span className="text-white">Fetching messages...</span>
          </div>
        </div>
      ) :  */}
      (
      <>
        {/* Transparent overlay to block pointer events */}
        <div
          className="fixed inset-0 z-40 bg-transparent pointer-events-auto"
          onClick={handleClick}
        />

        {/* Main chat modal */}
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-96 h-96 bg-gray-800 opacity-90 rounded-lg shadow-2xl flex flex-col backdrop-blur-sm pointer-events-auto">
          {/* Header with close button */}
          <div className="absolute right-3 top-3 z-10">
            <button
              onClick={handleClick}
              className="text-white hover:text-gray-300 transition-colors duration-200 p-2 bg-gray-900 hover:bg-gray-700 hover:bg-opacity-50 rounded-full"
              aria-label="Close chat"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Main message container */}
          <div
            className="flex-1 p-2 overflow-hidden flex flex-col"
            id="chat-message-container"
          >
            <div className="flex-1 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-600 border-opacity-30 pb-0 p-4 backdrop-blur-sm overflow-y-auto mb-2">
              {/* Messages list */}
              {messages.length > 0 ? (
                <div className="space-y-3 flex flex-col">
                  {messages.map((msg, idx) => (
                    <div key={idx} className="flex justify-start">
                      <div className="max-w-xs lg:max-w-md px-4 py-2 bg-gray-700 bg-opacity-80 text-white rounded-lg shadow">
                        <div className="text-xs text-gray-300 mb-1 font-medium">
                          {msg.senderId || "Unknown"}
                        </div>
                        <div className="text-sm text-white">{msg.content}</div>
                      </div>
                    </div>
                  ))}
                  {/* Invisible div to scroll to */}
                  <div ref={messagesEndRef} />
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-300">
                  <span className="text-sm opacity-75">
                    Messages will appear here...
                  </span>
                </div>
              )}
            </div>

            {/* Message input area */}
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyUp={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 bg-gray-700 bg-opacity-70 text-white rounded-md border border-gray-600 border-opacity-30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
              />
              <button
                onClick={sendMessage}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 font-medium"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </>
      ){/* } */}
    </>
  );
}

export default ChatComponent;
