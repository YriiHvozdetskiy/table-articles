import {Skeleton} from "@/components/ui/skeleton";

function TableLoadingSkeleton() {

   return (
      <div className="space-y-2">
         {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
               <Skeleton className="h-4 w-[300px]"/>
               <Skeleton className="h-4 flex-1"/>
            </div>
         ))}
      </div>
   );
}

export default TableLoadingSkeleton;