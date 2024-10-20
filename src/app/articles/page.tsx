'use client'

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Button} from "@/components/ui/button"
import {useQuery} from "@tanstack/react-query";
import Link from "next/link";
import TableLoadingSkeleton from "@/components/table/TableLoadingSkeleton";
import {serviceActions} from "@/services/serviceActions";
import {useReactTable, ColumnDef, flexRender, getCoreRowModel} from '@tanstack/react-table';
import {Posts} from "@/types";

function ArticlesPage() {
   const {data: posts = [], isLoading, error} = useQuery({
      ...serviceActions.getPostsQueryOptions(),
   });

   const columns: ColumnDef<Posts>[] = [
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
         cell: ({cell}) => (
            <div className='truncate max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl'>
               {cell.getValue()}
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

   const table = useReactTable({
      data: posts,
      columns,
      getCoreRowModel: getCoreRowModel(),
   });

   return (
      <div className="container mx-auto py-8">
         <Card>
            <CardHeader>
               <CardTitle className="text-2xl font-bold">List of Articles</CardTitle>
            </CardHeader>
            <CardContent>
               {isLoading ? (
                  <TableLoadingSkeleton/>
               ) : error ? (
                  <p className="text-red-500">{(error as Error).message}</p>
               ) : (
                  <Table>
                     <TableHeader>
                        {table.getHeaderGroups().map(headerGroup => (
                           <TableRow key={headerGroup.id}>
                              {headerGroup.headers.map(header => (
                                 <TableHead key={header.id}>
                                    {header.isPlaceholder
                                       ? null
                                       : flexRender(
                                          header.column.columnDef.header, header.getContext()
                                       )}
                                 </TableHead>
                              ))}
                           </TableRow>
                        ))}
                     </TableHeader>
                     <TableBody>
                        {table.getRowModel().rows.map(row => (
                           <TableRow key={row.id}>
                              {row.getVisibleCells().map(cell => (
                                 <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                 </TableCell>
                              ))}
                           </TableRow>
                        ))}
                     </TableBody>
                  </Table>
               )}
            </CardContent>
         </Card>
      </div>
   )
}

export default ArticlesPage;
