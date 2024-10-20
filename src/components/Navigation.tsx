'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';

import {mockNavigationLinks} from '@/mocks/navigation';

function Navigation() {
   const currentRoute = usePathname();

   return (
      <nav>
         <ul
            className={'flex flex-row space-x-5 justify-center items-center'}>
            {mockNavigationLinks.map((link) => {
               const isCurrent = currentRoute === link.href;

               return (
                  <li key={link.label}>
                     <Link
                        className={`${isCurrent ? 'text-blue-500' : ''} font-bold text-2xl`}
                        href={link.href}
                     >
                        {link.label}
                     </Link>
                  </li>
               );
            })}
         </ul>
      </nav>
   );
}

export default Navigation;