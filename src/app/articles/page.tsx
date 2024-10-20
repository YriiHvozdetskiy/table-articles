'use client'

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {useQuery} from "@tanstack/react-query";
import TableLoadingSkeleton from "@/components/table/TableLoadingSkeleton";
import {serviceActions} from "@/services/serviceActions";
import {flexRender, getCoreRowModel, useReactTable} from '@tanstack/react-table';
import {columns} from "@/components/pages/articles/table/columns";

function ArticlesPage() {
   const {data: posts = [], isLoading, error} = useQuery(serviceActions.getPostsQueryOptions());

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
               ) : table.getRowModel().rows?.length ? (
                  <Table>
                     <TableHeader>
                        {table.getHeaderGroups().map(headerGroup => (
                           <TableRow key={headerGroup.id}>
                              {headerGroup.headers.map(header => (
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
               ) : (
                  <p>No data available.</p>
               )}
            </CardContent>
         </Card>
      </div>
   )
}

export default ArticlesPage;
