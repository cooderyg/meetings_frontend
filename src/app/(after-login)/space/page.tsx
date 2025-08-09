import React from 'react';
import { DataTable } from '@/app/_components/data-table';

interface Props {
   searchParams: { [key: string]: string | string[] | undefined };
}

export default async function SpacePage({ searchParams }: Props) {
   const { tab } = await searchParams;

   return (
      <>
         <main className="flex flex-col h-screen max-h-screen ">
            {tab === 'general' && <h1 className="py-3 px-6 font-bold text-2xl text-slate-950">general</h1>}
            {tab === 'anote-team' && <h1 className="py-3 px-6 font-bold text-2xl text-slate-950">Anote팀</h1>}

            <section className="py-2 px-6">
               <DataTable />
            </section>
         </main>
      </>
   );
}
