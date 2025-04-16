import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapIcon, MailIcon } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">О проекте</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="prose max-w-none">
            <p className="lead">
              «Атлас финно-угорских народов» — это интерактивный образовательный проект, 
              посвященный истории, культуре и современному положению финно-угорских народов.
            </p>
            
            <h2>Наша миссия</h2>
            <p>
              Наша миссия — сохранение и популяризация культурного наследия финно-угорских 
              народов, повышение осведомленности о их роли в мировой истории и культуре, 
              а также содействие межкультурному диалогу и взаимопониманию.
            </p>
            
            <h2>Финно-угорские народы</h2>
            <p>
              Финно-угорские народы — группа народов, говорящих на языках финно-угорской языковой семьи.
              К ним относятся венгры, финны, эстонцы, карелы, саамы, коми, удмурты, марийцы, мордва,
              ханты, манси и другие народы, проживающие в различных регионах Евразии.
            </p>
            <p>
              Несмотря на географическую разобщенность, финно-угорские народы объединены
              общим языковым происхождением, схожими элементами культуры, традиций и фольклора.
            </p>
            
            <h2>О проекте</h2>
            <p>
              Интерактивный атлас представляет собой:
            </p>
            <ul>
              <li>Подробную информацию о каждом финно-угорском народе</li>
              <li>Интерактивную карту расселения финно-угорских народов</li>
              <li>Материалы о языках, традициях, истории и современном положении</li>
              <li>Фотографии и видеоматериалы, демонстрирующие культурное наследие</li>
            </ul>
            
            <h2>Источники и благодарности</h2>
            <p>
              При создании атласа были использованы материалы научных исследований, 
              этнографических экспедиций, а также данные национальных статистических служб.
              Мы благодарим всех ученых, этнографов, лингвистов и энтузиастов, чьи работы
              помогли в создании этого проекта.
            </p>
          </div>
        </div>
        
        <div className="lg:row-start-1">
          <div className="sticky top-24 space-y-6">
            <div className="rounded-lg overflow-hidden mb-6">
              <img 
                src="/placeholder.svg" 
                alt="О проекте" 
                className="w-full h-48 object-cover"
              />
            </div>
            
            <div className="bg-muted/30 p-5 rounded-lg mb-6">
              <h3 className="font-medium mb-4">Свяжитесь с нами</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Если у вас есть вопросы, предложения или вы хотите поделиться 
                информацией о финно-угорских народах, свяжитесь с нами:
              </p>
              <div className="flex items-center gap-2 mb-2">
                <MailIcon className="h-4 w-4 text-finno-blue" />
                <a href="mailto:info@finno-ugric.ru" className="text-sm hover:text-primary transition-colors">
                  info@finno-ugric.ru
                </a>
              </div>
            </div>
            
            <Button className="w-full mb-3" asChild>
              <Link to="/map">
                <MapIcon className="mr-2 h-4 w-4" />
                Исследовать карту
              </Link>
            </Button>
            
            <Button variant="outline" className="w-full" asChild>
              <Link to="/peoples">
                Изучить народы
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
