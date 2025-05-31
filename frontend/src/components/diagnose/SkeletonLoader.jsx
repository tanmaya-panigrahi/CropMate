import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonLoader() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-6 w-48" />
      <Skeleton className="h-40 w-full rounded-xl" />
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-24 w-full rounded-xl" />
    </div>
  );
}
