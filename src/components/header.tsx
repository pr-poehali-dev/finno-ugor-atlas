import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon, MenuIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

type HeaderProps = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

export const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Обработка скролла для изменения стиля хедера
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { title: "Главная", path: "/" },
    { title: "Атлас народов", path: "/atlas" },
    { title: "О проекте", path: "/about" },
  ];

  return (
    <header className={`sticky top-0 z-50 w-full border-b backdrop-blur transition-all ${
      isScrolled ? 'bg-background/95 shadow-sm' : 'bg-background/50'
    }`}>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo-b.svg" alt="Логотип" className="h-8 w-8" />
            <span className="hidden font-semibold sm:inline-block">
              Финно-угорские народы
            </span>
          </Link>
        </div>

        {/* Навигация для десктопа */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || 
                            (item.path === '/atlas' && location.pathname.startsWith('/atlas/'));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                {isDarkMode ? (
                  <SunIcon className="h-5 w-5" />
                ) : (
                  <MoonIcon className="h-5 w-5" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={toggleDarkMode}>
                {isDarkMode ? "Светлая тема" : "Темная тема"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Мобильное меню */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full md:hidden"
              >
                <MenuIcon className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path || 
                                  (item.path === '/atlas' && location.pathname.startsWith('/atlas/'));
                  return (
                    <SheetClose asChild key={item.path}>
                      <Link
                        to={item.path}
                        className={`text-lg font-medium py-2 border-b ${
                          isActive ? 'text-primary border-primary' : 'text-foreground border-muted'
                        }`}
                      >
                        {item.title}
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;