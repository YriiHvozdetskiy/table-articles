import {queryOptions} from "@tanstack/react-query";
import {QUERY_KEYS} from "@/constants/queryKeys";
import axiosInstance from "@/services/interceptor";
import {serviceRoutes} from "@/services/serviceRoutes";
import {Post} from "@/types";


export const serviceActions = {
   getChartQueryOptions: () => queryOptions({
      queryKey: [QUERY_KEYS.POSTS],
      queryFn: async ({signal}) => {
         const response = await axiosInstance.get<Post[]>(serviceRoutes.posts, {signal});
         return await Promise.all(
            response.data.map(async (post) => {
               const commentsResponse = await axiosInstance.get(serviceRoutes.postsById(post.id), {signal});
               return {...post, commentCount: commentsResponse.data.length};
            })
         );
      },
   }),
}
