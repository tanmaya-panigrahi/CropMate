/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, User, Bot } from "lucide-react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hello, I’m your farming assistant!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const cleanReply = (text) => {
    // Remove bold markers
    let cleaned = text.replace(/\*\*(.*?)\*\*/g, "$1");
    // Remove single asterisks around words
    cleaned = cleaned.replace(/\*(.*?)\*/g, "$1");
    // Optionally remove excess blank lines
    cleaned = cleaned.replace(/\n{3,}/g, "\n\n");
    return cleaned.trim();
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/chatbot`,
        { message: input.trim() },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const botText = cleanReply(response.data.reply);

      const botMessage = {
        role: "bot",
        text: botText,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Chatbot error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Sorry, I couldn't process your request." },
      ]);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex flex-col h-[calc(100vh-80px)] p-4 md:p-6 md:pb-2 pb-24">
      <h1 className="text-2xl font-semibold mb-4 text-[#103713]">
        CropMate Chatbot
      </h1>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto bg-white rounded-xl p-4 shadow-inner space-y-4">
        {messages.map((msg, index) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={index}
              className={`flex items-start max-w-[90%] ${isUser ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full text-white flex-shrink-0 bg-primary">
                {isUser ? <User size={18} /> : <Bot size={18} />}
              </div>

              <div
                className={`mx-1 px-2 md:mx-3 md:px-4 py-2 rounded-xl text-sm md:text-base break-words ${isUser
                  ? "bg-green-100 text-right text-green-900"
                  : "bg-[#E2DBD0] text-[#103713]"
                  }`}
              >
                <ReactMarkdown
                  components={{
                    p: ({ node, ...props }) => <p className="mb-2" {...props} />,
                    li: ({ node, ...props }) => <li className="ml-4 list-disc" {...props} />,
                  }}
                >
                  {msg.text}
                </ReactMarkdown>
              </div>
            </div>
          );
        })}
        {loading && (
          <div className="italic text-sm text-gray-500">Bot is typing...</div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input area */}
      <div className="mt-4 flex gap-2">
        <Input
          type="text"
          placeholder="Ask me anything about your crops..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1"
        />
        <Button
          onClick={handleSend}
          disabled={loading}
          className="bg-primary text-background hover:bg-green-800 transition-colors"
        >
          {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Send"}
        </Button>
      </div>
    </div>
  );
}
