"use client";

import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <main className="w-full flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full p-4">
        <div className="w-full space-y-2">
          <div className="flex space-x-2">
            <Skeleton className="h-12 w-[16%]" />
            <Skeleton className="h-12 w-[16%]" />
            <Skeleton className="h-12 w-[16%]" />
            <Skeleton className="h-12 w-[16%]" />
            <Skeleton className="h-12 w-[16%]" />
            <Skeleton className="h-12 w-[16%]" />
          </div>
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-8 w-[50%] mx-auto" />
        </div>
      </div>
    </main>
  );
};

export default Loading;
