import Navigation from "@/components/Navigation";
import ThemeSwitcher from "@/components/theme/ThemeSwitcher";

function Header() {

   return (
      <header className={'flex items-center px-4 py-6 space-x-6 container mx-auto'}>
         <ThemeSwitcher/>
         <Navigation/>
      </header>
   );
}

export default Header;