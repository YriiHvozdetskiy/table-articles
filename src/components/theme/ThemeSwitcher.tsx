"use client";

import {Moon, Sun} from 'lucide-react';
import {useEffect} from 'react';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {useAppSelector} from "@/hooks/useAppSelector";
import {setTheme} from "@/store/theme/themeSlice";

const themes = [
   {value: 'light', label: 'Світла', icon: Sun},
   {value: 'dark', label: 'Темна', icon: Moon},
];

export default function ThemeSwitcher() {
   const dispatch = useAppDispatch();
   const theme = useAppSelector((state) => state.theme.theme);

   const handleThemeChange = (value: string) => {
      if (value === 'light' || value === 'dark') {
         dispatch(setTheme(value));
      }
   };

   useEffect(() => {
      if (theme === 'dark') {
         document.documentElement.classList.add('dark');
      } else {
         document.documentElement.classList.remove('dark');
      }
   }, [theme]);

   return (
      <Select value={theme} onValueChange={handleThemeChange}>
         <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Оберіть тему"/>
         </SelectTrigger>
         <SelectContent>
            {themes.map(({value, label, icon: Icon}) => (
               <SelectItem key={value} value={value}>
                  <div className="flex items-center">
                     <Icon className="mr-2 h-4 w-4"/>
                     {label}
                  </div>
               </SelectItem>
            ))}
         </SelectContent>
      </Select>
   );
}
