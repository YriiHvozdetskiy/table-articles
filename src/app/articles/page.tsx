'use client'

import axiosInstance from "@/services/interceptor"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Button} from "@/components/ui/button"
import {useQuery} from "@tanstack/react-query";
import Link from "next/link";
import TableLoadingSkeleton from "@/components/table/TableLoadingSkeleton";

interface Post {
   id: number
   title: string
   body: string
   commentCount: number
}

interface Comment {
   id: number
   body: string
}

function ArticlesPage() {
   const {data: posts = [], isLoading, error} = useQuery({
      queryKey: ['posts'],
      queryFn: async () => {
         const response = await axiosInstance.get<Post[]>('/posts');
         return await Promise.all(
            response.data.map(async (post) => {
               const commentsResponse = await axiosInstance.get<Comment[]>(
                  `/posts/${post.id}/comments`
               );
               return {...post, commentCount: commentsResponse.data.length};
            })
         );
      },
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
                        <TableRow>
                           <TableHead>ID</TableHead>
                           <TableHead>Title</TableHead>
                           <TableHead>Description</TableHead>
                           <TableHead>Comments</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {posts.map((post) => (
                           <TableRow key={post.id}>
                              <TableCell>{post.id}</TableCell>
                              <TableCell className="font-medium">{post.title}</TableCell>
                              <TableCell
                                 className={'truncate max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl'}>{post.body}</TableCell>
                              <TableCell>
                                 <Link href={`/articles/${post.id}`} passHref>
                                    <Button variant="link">
                                       {post.commentCount}
                                    </Button>
                                 </Link>
                              </TableCell>
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