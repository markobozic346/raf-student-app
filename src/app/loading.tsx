"use client";

import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
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
  );
};

export default Loading;
