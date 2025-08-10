'use client';

import { MeetingsData } from '@/app/api/meeting/get-ai-summary';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Props {
   meetingsData: MeetingsData;
}

export default function AiSummary({ meetingsData }: Props) {
   return (
      <div className="prose prose-sm max-w-none">
         <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
               h1: ({ children }) => <h1 className="text-xl font-bold mb-4">{children}</h1>,
               h2: ({ children }) => <h2 className="text-lg font-semibold mb-3">{children}</h2>,
               ul: ({ children }) => <ul className="list-disc pl-6 mb-4">{children}</ul>,
               li: ({ children }) => <li className="mb-1">{children}</li>,
               strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
               p: ({ children }) => <p className="mb-3">{children}</p>,
            }}>
            {meetingsData.summary}
         </ReactMarkdown>
      </div>
   );
}
