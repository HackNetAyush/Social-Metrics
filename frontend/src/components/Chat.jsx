import { useState } from "react";
import { Mic, Send, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import axios from "axios";
import ReactMarkdown from "react-markdown"; // Import ReactMarkdown
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);

  // Handle text input change
  const handleInputChange = (event) => setInput(event.target.value);

  // Handle form submit (sending message)
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!input) return;

    const newUserMessage = { role: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInput(""); // Reset input field

    try {
      const response = await axios.post(
        "https://social-metrics-backend.onrender.com/trigger-flow",
        { inputValue: input }
      );
      const assistantMessage = {
        role: "assistant",
        content: response.data.output,
      };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: "Error communicating with the server." },
      ]);
    }
  };

  // Toggle voice input listening state
  const handleVoiceInput = () => setIsListening((prev) => !prev);

  // Clear chat messages
  const clearChat = () => setMessages([]);

  return (
    <div className="h-full flex flex-col gap-4">
      {/* Chat Area */}
      <Card className="h-[calc(100%-250px)] max-h-[570px] flex flex-col">
        <CardHeader>
          <CardTitle>AI Assistant</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow overflow-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${
                message.role === "user" ? "text-right" : "text-left"
              }`}
            >
              <span
                className={`inline-block p-2 rounded-lg ${
                  message.role === "user"
                    ? "bg-blue-500 text-white !rounded-tr-none"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white !rounded-tl-none"
                }`}
              >
                {message.role === "assistant" ? (
                  // Render Markdown content for assistant messages
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                ) : (
                  message.content // Display user content as is
                )}
              </span>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <form onSubmit={handleSubmit} className="flex w-full space-x-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your question here..."
              className="flex-grow"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
            {/* Voice Input Button (Commented Out for now) */}
            {/* <Button
              type="button"
              size="icon"
              variant="outline"
              onClick={handleVoiceInput}
            >
              <Mic className={`h-4 w-4 ${isListening ? "text-red-500" : ""}`} />
            </Button> */}
            <Button
              type="button"
              size="icon"
              variant="outline"
              onClick={clearChat}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>

      {/* Powered By Section */}
      <Card className="h-fit flex flex-col">
        <CardHeader>
          <CardTitle>Powered By</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full flex items-center p-3">
            <svg
              width="10rem"
              height="1rem"
              viewBox="0 0 161 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path
                  d="M80.6844 14.9991V11.7853H94.1512V9.06231H83.6346L80.0166 6.4078V2.65451L83.6346 0H96.5273V3.21375H83.3959V5.84856H93.9125L97.5295 8.50213V12.3455L93.9125 14.9991H80.6844Z"
                  fill="white"
                ></path>
                <path
                  d="M36.843 14.9991L30.2354 4.10516L23.6169 14.9991H19.7148L28.8229 0H31.637L40.7451 14.9991H36.843Z"
                  fill="white"
                ></path>
                <path
                  d="M47.0761 14.9991V3.21375H40.0088V0H57.5216V3.21375H50.4544V14.9991H47.0761Z"
                  fill="white"
                ></path>
                <path
                  d="M107.965 14.9991V3.21375H100.897V0H118.411V3.21375H111.344V14.9991H107.965Z"
                  fill="white"
                ></path>
                <path
                  d="M0 14.9991V0H13.8959L17.5138 2.65451V12.3455L13.8959 15H0V14.9991ZM14.1346 11.7853V3.21375H3.37829V11.7853H14.1346Z"
                  fill="white"
                ></path>
                <path
                  d="M140.604 14.9991L145.158 7.5L140.604 0H144.506L149.062 7.5L144.506 14.9991H140.604Z"
                  fill="white"
                ></path>
                <path
                  d="M156.963 14.9991L152.406 7.5L156.963 0H160.864L156.31 7.5L160.864 14.9991H156.963Z"
                  fill="white"
                ></path>
                <path
                  d="M73.9143 14.9991L67.2958 4.10516L60.6872 14.9991H56.7852L65.8932 0H68.7073L77.8154 14.9991H73.9143Z"
                  fill="white"
                ></path>
                <path
                  d="M134.803 14.9991L128.185 4.10516L121.577 14.9991H117.675L126.783 0H129.597L138.705 14.9991H134.803Z"
                  fill="white"
                ></path>
              </g>
            </svg>
          </div>
          <div className="w-full h-fit items-center p-3">
            <img
              decoding="async"
              src="https://framerusercontent.com/images/nOfdJGAX6qhOog6bqsyOeqehA.svg"
              alt="Logo"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
