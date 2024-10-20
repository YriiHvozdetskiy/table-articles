import {queryOptions} from "@tanstack/react-query";
import {QUERY_KEYS} from "@/constants/queryKeys";
import axiosInstance from "@/services/interceptor";
import {serviceRoutes} from "@/services/serviceRoutes";
import {Comments, Posts} from "@/types";


export const serviceActions = {
   getPostsQueryOptions: () => queryOptions({
      queryKey: [QUERY_KEYS.POSTS],
      queryFn: async ({signal}) => {
         const response = await axiosInstance.get<Posts[]>(serviceRoutes.posts, {signal});

         return await Promise.all(
            response.data.map(async (post) => {
               const commentsResponse = await axiosInstance.get<Comments[]>(serviceRoutes.postsById(post.id), {signal});
               return {...post, commentCount: commentsResponse.data.length};
            })
         );
      },
   }),
   getCommentsQueryOptions: (articleID: number) => queryOptions({
      queryKey: [QUERY_KEYS.COMMENTS, articleID],
      queryFn: async () => {
         const response = await axiosInstance.get<Comments[]>(serviceRoutes.postsById(articleID));
         return response.data;
      },
   })
}
