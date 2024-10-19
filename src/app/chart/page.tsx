'use client'

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/services/interceptor";
import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import TableLoadingSkeleton from "@/components/table/TableLoadingSkeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {useAppSelector} from "@/hooks/useAppSelector";
import {serviceRoutes} from "@/services/serviceRoutes";

interface Post {
   id: number;
   commentCount: number;
}

const THEMES_COLORS = {
   light: '#f4f4f5',
   dark: '#010101',
};

function LineChartPage() {
   const theme = useAppSelector((state) => state.theme.theme);

   const { data: posts = [], isLoading, error } = useQuery({
      queryKey: ['posts'],
      queryFn: async () => {
         const response = await axiosInstance.get<Post[]>(serviceRoutes.posts);
         return await Promise.all(
            response.data.map(async (post) => {
               const commentsResponse = await axiosInstance.get(`${serviceRoutes.posts}/${post.id}/comments`);
               return { ...post, commentCount: commentsResponse.data.length };  // Без фіксованого ліміту, отримуємо фактичну кількість
            })
         );
      },
   });

   const [chartData, setChartData] = useState({
      options: {
         chart: {
            id: "comments-line-chart",
            foreColor: theme === 'dark' ? '#f4f4f5' : '#010101',  // Колір тексту залежно від теми
         },
         xaxis: {
            title: {
               text: "Article",
               style: {
                  color: theme === 'dark' ? '#f4f4f5' : '#010101',  // Колір для осі X
               },
            },
            categories: [] as number[],  // Буде динамічно оновлюватись
            labels: {
               rotate: -90,  // Менший кут повороту для кращої читабельності
               maxHeight: 100,  // Обмеження висоти
               hideOverlappingLabels: true,  // Приховування перекритих підписів
               style: {
                  fontSize: '12px',
                  style: {
                     colors: theme === 'dark' ? '#f4f4f5' : '#010101',  // Колір підписів
                  },
               },
            },
            // tickAmount: 10,  // Відображає лише кожен 10-й підпис
         },
         yaxis: {
            title: {
               text: "Comments",
            },
            labels: {
               style: {
                  colors: theme === 'dark' ? '#f4f4f5' : '#010101',  // Колір підписів
               },
            },
            min: 0,
            // max буде динамічно встановлений залежно від фактичних даних
         },
         tooltip: {
            theme: theme,  // 'dark' або 'light'
         },
         grid: {
            borderColor: theme === 'dark' ? '#f4f4f5' : '#010101',  // Колір для сітки
         },
      },
      series: [
         {
            name: "Comments",
            data: [] as number[],  // Динамічно оновлюється
         },
      ],
   });

   useEffect(() => {
      if (posts.length > 0) {
         // Отримуємо максимальну кількість коментарів для динамічного налаштування осі Y
         const maxComments = Math.max(...posts.map((post) => post.commentCount));

         setChartData((prevChartData) => ({
            ...prevChartData,  // Зберігаємо попередні налаштування
            options: {
               ...prevChartData.options,
               chart: {
                  ...prevChartData.options.chart,
                  foreColor: theme === 'dark' ? '#f4f4f5' : '#010101',
               },
               xaxis: {
                  ...prevChartData.options.xaxis,
                  style: {
                     fontSize: '12px',
                     colors: theme === 'dark' ? '#f4f4f5' : '#010101',
                  },
                  categories: Array.from({ length: posts.length }, (_, index) => index + 1),  // Оновлюємо категорії
               },
               yaxis: {
                  ...prevChartData.options.yaxis,
                  title: {
                     ...prevChartData.options.yaxis.title,
                     style: {
                        color: theme === 'dark' ? '#f4f4f5' : '#010101',
                     },
                  },
                  labels: {
                     style: {
                        colors: theme === 'dark' ? '#f4f4f5' : '#010101',
                     },
                  },
                  max: maxComments,  // Встановлюємо максимальне значення для осі Y залежно від фактичної кількості коментарів
               },
            },
            grid: {
               borderColor: theme === 'dark' ? '#52525b' : '#e5e7eb',
            },
            tooltip: {
               theme: theme,
            },
            series: [
               {
                  name: "Comments",
                  data: posts.map((post) => post.commentCount),  // Оновлюємо кількість коментарів
               },
            ],
         }));
      }
   }, [posts, theme]);

   return (
      <div className="container mx-auto py-8">
         <Card>
            <CardHeader>
               <CardTitle className="text-2xl font-bold">Graph to display the number of comments for each article.</CardTitle>
            </CardHeader>
            <CardContent>
               {isLoading ? (
                  <TableLoadingSkeleton />
               ) : error ? (
                  <p className="text-red-500">{(error as Error).message}</p>
               ) : (
                  <div className="row">
                     <div className="mixed-chart">
                        <Chart
                           options={chartData.options}
                           series={chartData.series}
                           type="line"  // Тип графіка: лінійний
                           width="100%"
                           height="400"
                        />
                     </div>
                  </div>
               )}
            </CardContent>
         </Card>
      </div>
   );
}

export default LineChartPage;