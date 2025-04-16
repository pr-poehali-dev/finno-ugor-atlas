import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="border-t py-6 md:py-10 bg-muted/40">
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <img src="/logo-b.svg" alt="Логотип" className="h-8 w-8" />
            <span className="font-semibold">Атлас финно-угорских народов</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Интерактивный атлас культуры и истории финно-угорских народов
          </p>
        </div>
        
        <div>
          <h3 className="font-medium mb-4">Разделы</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-primary transition-colors">
                Главная
              </Link>
            </li>
            <li>
              <Link to="/peoples" className="hover:text-primary transition-colors">
                Народы
              </Link>
            </li>
            <li>
              <Link to="/map" className="hover:text-primary transition-colors">
                Карта
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-primary transition-colors">
                О проекте
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-medium mb-4">Контакты</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <span>✉️</span>
              <a href="mailto:info@finno-ugric.ru" className="hover:text-primary transition-colors">
                info@finno-ugric.ru
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span>📱</span>
              <span>+7 (900) 123-45-67</span>
            </li>
          </ul>
          <p className="text-xs text-muted-foreground mt-4">
            © 2024 Атлас финно-угорских народов. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
