'use client'

import {useState} from "react"
import axiosInstance from "@/services/interceptor"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Skeleton} from "@/components/ui/skeleton"
import {BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts'
import {Button} from "@/components/ui/button"
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog"
import {useQuery} from "@tanstack/react-query";

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

export default function ArticlesPage() {
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
               <CardTitle className="text-2xl font-bold">Posts from JSONPlaceholder</CardTitle>
            </CardHeader>
            <CardContent>
               {isLoading ? (
                  <LoadingSkeleton/>
               ) : error ? (
                  <p className="text-red-500">{(error as Error).message}</p>
               ) : (
                  <Table>
                     <TableHeader>
                        <TableRow>
                           <TableHead>ID</TableHead>
                           <TableHead>Title</TableHead>
                           <TableHead>Body</TableHead>
                           <TableHead>Chart</TableHead>
                           <TableHead>Comment</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {posts.map((post) => (
                           <TableRow key={post.id}>
                              <TableCell>{post.id}</TableCell>
                              <TableCell className="font-medium">{post.title}</TableCell>
                              <TableCell>{truncateText(post.body, 50)}</TableCell>
                              {/*<TableCell>*/}
                              {/*   <CommentChart commentCount={post.commentCount}/>*/}
                              {/*</TableCell>*/}
                              <TableCell>
                                 <CommentDialog postId={post.id} commentCount={post.commentCount}/>
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

function CommentChart({commentCount}: { commentCount: number }) {
   const data = [{name: 'Comments', count: commentCount}]

   return (
      <ResponsiveContainer width="100%" height={50}>
         <BarChart data={data}>
            <Bar dataKey="count" fill="#8884d8"/>
            <XAxis dataKey="name" hide/>
            <YAxis hide/>
            <Tooltip/>
         </BarChart>
      </ResponsiveContainer>
   )
}

function CommentDialog({postId, commentCount}: { postId: number; commentCount: number }) {
   const [comments, setComments] = useState<Comment[]>([])
   const [isLoading, setIsLoading] = useState(false)

   const fetchComments = async () => {
      setIsLoading(true)
      try {
         const response = await axiosInstance.get<Comment[]>(`/posts/${postId}/comments`)
         setComments(response.data)
      } catch (error) {
         console.error('Error loading comments:', error)
      } finally {
         setIsLoading(false)
      }
   }

   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button variant="link" onClick={fetchComments}>
               {commentCount}
            </Button>
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Comments for Post {postId}</DialogTitle>
            </DialogHeader>
            {isLoading ? (
               <LoadingSkeleton/>
            ) : (
               <ul className="space-y-2">
                  {comments.map((comment) => (
                     <li key={comment.id} className="border-b pb-2">
                        {comment.body}
                     </li>
                  ))}
               </ul>
            )}
         </DialogContent>
      </Dialog>
   )
}

function LoadingSkeleton() {
   return (
      <div className="space-y-2">
         {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
               <Skeleton className="h-4 w-[300px]"/>
               <Skeleton className="h-4 flex-1"/>
            </div>
         ))}
      </div>
   )
}

function truncateText(text: string, maxLength: number) {
   if (text.length <= maxLength) return text
   return text.slice(0, maxLength) + '...'
}