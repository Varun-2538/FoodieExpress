import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function MenuItemSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="flex gap-4 p-4">
        <div className="flex-1 space-y-3">
          <div className="flex items-start justify-between">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-9 w-24 rounded-md" />
          </div>
        </div>
        <Skeleton className="h-20 w-20 rounded-md" />
      </div>
    </Card>
  )
}
