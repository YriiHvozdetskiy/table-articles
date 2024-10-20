'use client';

import {useQuery} from '@tanstack/react-query';
import {flexRender, getCoreRowModel, useReactTable,} from '@tanstack/react-table';
import Link from 'next/link';

import {Card, CardContent, CardHeader, CardTitle,} from '@/components/ui/card';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from '@/components/ui/table';
import {Button} from '@/components/ui/button';
import TableLoadingSkeleton from '@/components/table/TableLoadingSkeleton';
import {serviceActions} from '@/services/serviceActions';
import {columns} from '@/components/pages/article-details/table/columns';

function ArticleDetailsPage({params}: { params: { id: string } }) {
   const {data: comments = [], isLoading, error} =
      useQuery(serviceActions.getCommentsQueryOptions(Number(params.id)));

   const table = useReactTable({
      data: comments,
      columns,
      getCoreRowModel: getCoreRowModel(),
   });

   return (
      <div className="container mx-auto py-8">
         <Card>
            <CardHeader>
               <CardTitle className="text-2xl font-bold">
                  Comments for Article id: {params.id}
               </CardTitle>
               <Link href="/articles" passHref className="self-start">
                  <Button variant="link" className="mt-2">
                     Back to Articles
                  </Button>
               </Link>
            </CardHeader>
            <CardContent>
               {isLoading ? (
                  <TableLoadingSkeleton/>
               ) : error ? (
                  <p className="text-red-500">{(error as Error).message}</p>
               ) : (
                  <>
                     {table.getRowModel().rows?.length ? (
                        <Table>
                           <TableHeader>
                              {table.getHeaderGroups().map((headerGroup) => (
                                 <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                       <TableHead key={header.id}>
                                          {header.isPlaceholder
                                             ? null
                                             : flexRender(header.column.columnDef.header, header.getContext()
                                             )}
                                       </TableHead>
                                    ))}
                                 </TableRow>
                              ))}
                           </TableHeader>
                           <TableBody>
                              {table.getRowModel().rows.map((row) => (
                                 <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                       <TableCell key={cell.id}>
                                          {flexRender(
                                             cell.column.columnDef.cell,
                                             cell.getContext()
                                          )}
                                       </TableCell>
                                    ))}
                                 </TableRow>
                              ))}
                           </TableBody>
                        </Table>
                     ) : (
                        <p className="text-center text-gray-500">No comments available</p>
                     )}
                  </>
               )}
            </CardContent>
         </Card>
      </div>
   );
}

export default ArticleDetailsPage;
