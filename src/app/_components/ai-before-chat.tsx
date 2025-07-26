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

function ChatMessages() {
  const messages: Messages[] = [];
  return (
    <div className="flex-1 overflow-y-auto px-4 py-6">
      {messages.map((msg, i) => (
        <div key={i} className="mb-2 text-gray-700 text-sm">
          {msg.text}
        </div>
      ))}
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
    <div className="flex flex-col items-end justify-center">
      <p className="text-sm font-medium text-slate-950 px-4 py-2">
        AI에게 이렇게 물어볼 수 있어요
      </p>
      {suggestions.map((s, i) => (
        <div className="px-4 py-2">
          <Button
            key={i}
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

export default function AiBeforeChat() {
  const [input, setInput] = useState("");
  const isDisabled = false;
  return (
    <div className="flex flex-col h-ful py-6 px-4 min-w-[389px] bg-slate-200">
      <ChatMessages />
      <ChatSuggestions onSelect={setInput} />

      <Textarea
        placeholder="AI에게 요청할 내용을 입력하세요."
        className="py-[10px] px-3 placeholder:text-slate-500 text-sm h-20 bg-white"
      />
      <Button
        className={cn("mt-[7px]", isDisabled ? "opacity-50" : "")}
        disabled
      >
        보내기
      </Button>
    </div>
  );
}
