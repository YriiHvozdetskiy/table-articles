import {dehydrate, HydrationBoundary} from "@tanstack/react-query";
import Articles from "@/components/pages/articles/Articles";
import getQueryClient from "@/utils/getQueryClient";
import {serviceActions} from "@/services/serviceActions";

async function ArticlesPage() {
   // getQueryClient - used for all service components
   const queryClient = getQueryClient();
   await queryClient.prefetchQuery(serviceActions.getPostsQueryOptions());

   return (
      <HydrationBoundary state={dehydrate(queryClient)}>
         <Articles />
      </HydrationBoundary>
   )
}

export default ArticlesPage;
