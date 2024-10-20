"use client"

import {useQuery} from "@tanstack/react-query";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import TableLoadingSkeleton from "@/components/table/TableLoadingSkeleton";
import {serviceActions} from "@/services/serviceActions";

function ArticleDetailsPage({params}: { params: { id: string } }) {
   const {data: comments = [], isLoading, error} = useQuery({
      ...serviceActions.getCommentsQueryOptions(Number(params.id)),
   });

   return (
      <div className="container mx-auto py-8">
         <Card>
            <CardHeader>
               <CardTitle className="text-2xl font-bold">Comments for Article id:{params.id}</CardTitle>
               <Link href="/articles" passHref className={'self-start'}>
                  <Button variant="link" className="mt-2">Back to Articles</Button>
               </Link>
            </CardHeader>
            <CardContent>
               {isLoading ? (
                  <TableLoadingSkeleton/>
               ) : error ? (
                  <p className="text-red-500">{(error as Error).message}</p>
               ) : (
                  <Table>
                     <TableHeader>
                        <TableRow>
                           <TableHead>ID</TableHead>
                           <TableHead>Name</TableHead>
                           <TableHead>Email</TableHead>
                           <TableHead>Comments</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {comments.map((comment) => (
                           <TableRow key={comment.id}>
                              <TableCell>{comment.id}</TableCell>
                              <TableCell>{comment.name}</TableCell>
                              <TableCell>{comment.email}</TableCell>
                              <TableCell>{comment.body}</TableCell>
                           </TableRow>
                        ))}
                     </TableBody>
                  </Table>
               )}
            </CardContent>
         </Card>
      </div>
   );
}

export default ArticleDetailsPage
