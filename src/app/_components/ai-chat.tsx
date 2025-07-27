"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Messages {
  role: string;
  text: string;
}

function ChatMessages({
  messages,
  onSendMessage,
}: {
  messages: Messages[];
  onSendMessage: (text: string) => void;
}) {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-6">
      {messages.length === 0 ? (
        <div className="flex flex-col items-end justify-center h-full">
          <p className="text-sm font-medium text-slate-950 px-4 py-2">
            AI에게 이렇게 물어볼 수 있어요
          </p>
          <ChatSuggestions onSelect={onSendMessage} />
        </div>
      ) : (
        messages.map((msg, i) => (
          <div
            key={i}
            className={cn(
              "mb-4 p-3 rounded-lg max-w-[80%]",
              msg.role === "user"
                ? "ml-auto bg-slate-800 text-white"
                : "mr-auto bg-white text-slate-900"
            )}
          >
            <div className="text-sm whitespace-pre-line">{msg.text}</div>
          </div>
        ))
      )}
    </div>
  );
}

function ChatSuggestions({ onSelect }: { onSelect: (text: string) => void }) {
  const suggestions = [
    "결정된 내용 알려줘",
    "해야 할 일 정리해줘",
    "핵심 내용만 다시 알려줘",
    "A화자가 말한 것만 정리해줘",
    "논의가 안 끝난 부분 알려줘",
  ];
  return (
    <div className="flex flex-col items-end">
      {suggestions.map((s, i) => (
        <div key={i} className="px-4 py-2">
          <Button
            variant="outline"
            className="justify-start py-2 px-4 text-slate-900 border border-slate-200"
            onClick={() => onSelect(s)}
          >
            {s}
          </Button>
        </div>
      ))}
    </div>
  );
}

export default function AiChat() {
  const [messages, setMessages] = useState<Messages[]>([]);
  const [input, setInput] = useState("");
  const isDisabled = !input.trim();

  const handleSendMessage = (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const newMessage: Messages = { role: "user", text: messageText };
    setMessages((prev) => [...prev, newMessage]);

    if (!text) {
      setInput("");
    }

    setTimeout(() => {
      const aiResponse: Messages = {
        role: "assistant",
        text: "요청하신 내용에 대한 답변입니다.\n\n• 분석 결과를 바탕으로 한 제안사항\n• 구체적인 실행 방안\n• 추가 고려사항",
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full py-6 px-4 min-w-[389px] bg-slate-200">
      <ChatMessages messages={messages} onSendMessage={handleSendMessage} />

      <div className="mt-auto">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="AI에게 요청할 내용을 입력하세요."
          className="py-[10px] px-3 placeholder:text-slate-500 text-sm h-20 bg-white"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <Button
          className={cn("mt-[7px] w-full", isDisabled ? "opacity-50" : "")}
          disabled={isDisabled}
          onClick={() => handleSendMessage()}
        >
          보내기
        </Button>
      </div>
    </div>
  );
}
