import { Button } from '@/components/ui/button';
import { PenIcon } from 'lucide-react';
import React from 'react';
import { DataTable } from '../_components/data-table';
import Link from 'next/link';

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function HomePage({ searchParams }: Props) {
  const { tab } = await searchParams;

  console.log(tab);

  return (
    <main className="flex flex-col h-screen max-h-screen ">
      {tab === undefined && (
        <section className="flex flex-col justify-center items-center min-h-[200px] w-full">
          <h1 className="font-bold text-2xl text-slate-950">
            👋 안녕하세요. 오늘도 새로운 기록을 시작해볼까요?
          </h1>
          <Link
            href="/meeting"
            className="text-sm text-slate-50 leading-6 font-medium w-[137px] h-10 mt-6 bg-slate-950 flex items-center justify-center rounded-[6px]"
          >
            <PenIcon size={16} color="#F8FAFC" className="mr-2" />새 노트 만들기
          </Link>
        </section>
      )}

      {tab === 'drafts' && (
        <h1 className="py-3 px-6 font-bold text-2xl text-slate-950">초안</h1>
      )}

      {tab === 'shared' && (
        <h1 className="py-3 px-6 font-bold text-2xl text-slate-950">
          공유 받은 노트
        </h1>
      )}

      <section className="py-2 px-6">
        <DataTable />
      </section>
    </main>
  );
}
