import {ColumnDef} from '@tanstack/react-table';
import Link from 'next/link';

import {Posts} from '@/types';
import {Button} from '@/components/ui/button';

export const columns: ColumnDef<Posts>[] = [
   {
      accessorKey: 'id',
      header: 'ID',
   },
   {
      accessorKey: 'title',
      header: 'Title',
   },
   {
      accessorKey: 'body',
      header: 'Description',
      cell: ({row}) => (
         <div className='truncate max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl'>
            {row.original.body}
         </div>
      ),
   },
   {
      accessorKey: 'commentCount',
      header: 'Comments',
      cell: ({row}) => (
         <Link href={`/articles/${row.original.id}`} passHref>
            <Button variant="link">
               {row.original.commentCount}
            </Button>
         </Link>
      ),
   },
];