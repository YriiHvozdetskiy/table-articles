import {Skeleton} from '@/components/ui/skeleton';

function TableLoadingSkeleton() {

   return (
      <div className="space-y-2">
         {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
               <Skeleton className="h-10 w-[300px]"/>
               <Skeleton className="h-10 flex-1"/>
               <Skeleton className="h-10 flex-1"/>
            </div>
         ))}
      </div>
   );
}

export default TableLoadingSkeleton;