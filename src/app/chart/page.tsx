'use client';

import {useQuery} from '@tanstack/react-query';
import {useMemo} from 'react';
import Chart from 'react-apexcharts';

import TableLoadingSkeleton from '@/components/table/TableLoadingSkeleton';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {useAppSelector} from '@/hooks/redux/useAppSelector';
import {serviceActions} from '@/services/serviceActions';

const THEMES_COLORS = {
   light: {
      textColor: '#010101',
      gridBorderColor: '#e5e7eb',
   },
   dark: {
      textColor: '#f4f4f5',
      gridBorderColor: '#52525b',
   },
};

function ChartPage() {
   const theme = useAppSelector((state) => state.theme.theme);

   const {textColor, gridBorderColor} = THEMES_COLORS[theme];

   const {data: posts = [], isLoading, error} = useQuery({
      ...serviceActions.getPostsQueryOptions(),
      staleTime: 1000 * 60,
   });

   const chartData = useMemo(() => {
      if (posts.length === 0) {
         return null;
      }

      const maxComments = Math.max(...posts.map((post) => post.commentCount));

      return {
         options: {
            chart: {
               id: 'comments-line-chart',
               foreColor: textColor,
            },
            xaxis: {
               title: {
                  text: 'Article',
                  style: {
                     color: textColor,
                  },
               },
               categories: posts.map((_, index) => index + 1),
               labels: {
                  rotate: -90,
                  maxHeight: 100,
                  hideOverlappingLabels: true,
                  style: {
                     fontSize: '12px',
                     colors: textColor,
                  },
               },
            },
            yaxis: {
               title: {
                  text: 'Comments',
                  style: {
                     color: textColor,
                  },
               },
               labels: {
                  style: {
                     colors: textColor,
                  },
               },
               min: 0,
               max: maxComments,
            },
            tooltip: {
               theme,
            },
            grid: {
               borderColor: gridBorderColor,
            },
         },
         series: [
            {
               name: 'Comments',
               data: posts.map((post) => post.commentCount),
            },
         ],
      };
   }, [posts, textColor, gridBorderColor, theme]);

   return (
      <div className="container mx-auto py-8">
         <Card>
            <CardHeader>
               <CardTitle className="text-2xl font-bold">
                  Graph to display the number of comments for each article.
               </CardTitle>
            </CardHeader>
            <CardContent>
               {isLoading ? (
                  <TableLoadingSkeleton/>
               ) : error ? (
                  <p className="text-red-500">{(error as Error).message}</p>
               ) : chartData ? (
                  <div className="row">
                     <div className="mixed-chart">
                        <Chart
                           options={chartData.options}
                           series={chartData.series}
                           type="line"
                           width="100%"
                           height="400"
                        />
                     </div>
                  </div>
               ) : null}
            </CardContent>
         </Card>
      </div>
   );
}

export default ChartPage;