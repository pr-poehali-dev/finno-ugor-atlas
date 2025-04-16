import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapIcon, UsersIcon, BookOpenIcon } from "lucide-react";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Главный баннер */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-finno-dark/70 to-finno-dark/50 z-10"></div>
        <img 
          src="/placeholder.svg" 
          alt="Финно-угорские народы" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="container relative z-20 h-full flex flex-col justify-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-3xl">
            Интерактивный атлас финно-угорских народов
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl">
            Изучите богатую культуру и историю финно-угорских народов через интерактивные карты, данные и истории
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <Link to="/map">
                <MapIcon className="mr-2 h-5 w-5" />
                Исследовать карту
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10" asChild>
              <Link to="/peoples">
                <UsersIcon className="mr-2 h-5 w-5" />
                Познакомиться с народами
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Информационный раздел */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-lg shadow-sm border">
              <div className="w-12 h-12 bg-finno-blue/10 rounded-full flex items-center justify-center mb-4">
                <MapIcon className="h-6 w-6 text-finno-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Интерактивная карта</h3>
              <p className="text-muted-foreground mb-4">
                Исследуйте географическое распределение финно-угорских народов с помощью интерактивной карты
              </p>
              <Button variant="link" className="p-0" asChild>
                <Link to="/map">Перейти к карте</Link>
              </Button>
            </div>
            
            <div className="bg-background p-6 rounded-lg shadow-sm border">
              <div className="w-12 h-12 bg-finno-green/10 rounded-full flex items-center justify-center mb-4">
                <UsersIcon className="h-6 w-6 text-finno-green" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Народы и культуры</h3>
              <p className="text-muted-foreground mb-4">
                Узнайте о культуре, языках, традициях и истории различных финно-угорских народов
              </p>
              <Button variant="link" className="p-0" asChild>
                <Link to="/peoples">Изучить народы</Link>
              </Button>
            </div>
            
            <div className="bg-background p-6 rounded-lg shadow-sm border">
              <div className="w-12 h-12 bg-finno-orange/10 rounded-full flex items-center justify-center mb-4">
                <BookOpenIcon className="h-6 w-6 text-finno-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-3">О проекте</h3>
              <p className="text-muted-foreground mb-4">
                Узнайте больше о нашем проекте, его целях и миссии по сохранению и популяризации финно-угорского наследия
              </p>
              <Button variant="link" className="p-0" asChild>
                <Link to="/about">Подробнее</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Статистический раздел */}
      <section className="py-16 finno-gradient text-white">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">Финно-угорские народы в цифрах</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold mb-2">25+</p>
              <p className="text-lg">Народов</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">23</p>
              <p className="text-lg">Языка</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">25M+</p>
              <p className="text-lg">Носителей</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">5000+</p>
              <p className="text-lg">Лет истории</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
