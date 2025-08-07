import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';

export default function TrashPage() {
  return (
    <div className="px-6">
      <Tabs defaultValue="space">
        <TabsList className="bg-white border-b border-slate-200 rounded-none p-0 h-auto">
          <TabsTrigger
            value="space"
            className="py-2 px-4 bg-white rounded-none border-b-2 border-transparent data-[state=active]:border-slate-950 data-[state=active]:bg-white"
          >
            Space
          </TabsTrigger>
          <TabsTrigger
            value="note"
            className="py-2 px-4 bg-white rounded-none border-b-2 border-transparent data-[state=active]:border-slate-950 data-[state=active]:bg-white"
          >
            노트
          </TabsTrigger>
        </TabsList>
        <section className="py-6 bg-white">
          <TabsContent value="space">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="note">Change your password here.</TabsContent>
        </section>
      </Tabs>
    </div>
  );
}
