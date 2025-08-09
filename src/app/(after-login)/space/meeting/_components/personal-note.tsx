'use client';

import { useState, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { useTranscriptData } from '@/app/store/trance-data';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function PersonalNote() {
   const [content, setContent] = useState<string>('');
   const [isEditing, setIsEditing] = useState(true);
   const textareaRef = useRef<HTMLTextAreaElement>(null);
   const lastInsertTime = useRef<number>(0);
   const { isRecording, getFormattedTime } = useTranscriptData();

   return (
      <div className="flex flex-col h-full">
         <div className="flex-1 overflow-y-auto">
            {isEditing ? (
               <textarea
                  ref={textareaRef}
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  // onKeyDown={handleKeyDown}
                  placeholder="메모를 작성해 주세요"
                  className={cn(
                     'w-full h-full min-h-[400px] border-0 resize-none',
                     'text-[15px] leading-relaxed font-mono',
                     'focus:outline-none',
                  )}
                  autoFocus
               />
            ) : (
               <div className="p-4 h-full overflow-y-auto">
                  <ReactMarkdown
                     remarkPlugins={[remarkGfm]}
                     // className="prose prose-sm max-w-none p-4"
                     components={{
                        h2: ({ children }) => (
                           <div className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium mb-2 mt-4">
                              {children}
                           </div>
                        ),
                        h1: ({ children }) => <h1 className="text-xl font-bold text-gray-800 mb-2">{children}</h1>,
                        p: ({ children }) => <p className="text-gray-700 mb-2 leading-relaxed">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                        strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
                        em: ({ children }) => <em className="italic text-gray-700">{children}</em>,
                     }}>
                     {content}
                  </ReactMarkdown>
               </div>
            )}
         </div>
      </div>
   );
}
