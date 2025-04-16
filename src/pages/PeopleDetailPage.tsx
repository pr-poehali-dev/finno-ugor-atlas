import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Users, Globe, Calendar } from "lucide-react";
import { peoples } from "@/data/peoples";

const PeopleDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const people = peoples.find((p) => p.id === id);
  
  if (!people) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Народ не найден</h1>
        <p className="text-muted-foreground mb-6">
          Информация о запрашиваемом народе не найдена.
        </p>
        <Button asChild>
          <Link to="/peoples">Вернуться к списку</Link>
        </Button>
      </div>
    );
  }
  
  // Определяем цвет для стилизации страницы
  const colorClasses = {
    blue: "border-finno-blue bg-finno-blue/5",
    green: "border-finno-green bg-finno-green/5",
    orange: "border-finno-orange bg-finno-orange/5",
    red: "border-finno-red bg-finno-red/5",
  };
  
  return (
    <div className="container py-8">
      <Button 
        variant="ghost" 
        className="mb-6"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Назад
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold mb-4">{people.name}</h1>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center bg-muted/40 px-3 py-1.5 rounded-full text-sm">
              <Users className="h-4 w-4 mr-2" />
              {people.population.toLocaleString()} чел.
            </div>
            <div className="flex items-center bg-muted/40 px-3 py-1.5 rounded-full text-sm">
              <Globe className="h-4 w-4 mr-2" />
              {people.language}
            </div>
            <div className="flex items-center bg-muted/40 px-3 py-1.5 rounded-full text-sm">
              <MapPin className="h-4 w-4 mr-2" />
              Группа: {
                people.group === "finnic" ? "Прибалтийско-финская" :
                people.group === "ugric" ? "Угорская" :
                people.group === "permian" ? "Пермская" :
                "Волжская"
              }
            </div>
          </div>
          
          <div className={`border-l-4 p-6 rounded-md mb-8 ${colorClasses[people.color]}`}>
            <p className="italic">{people.description}</p>
          </div>
          
          <div className="prose max-w-none">
            <p>{people.fullDescription || people.description}</p>
          </div>
        </div>
        
        <div>
          <div className="sticky top-24">
            <div className="rounded-lg overflow-hidden mb-6">
              <img 
                src={people.imageUrl || "/placeholder.svg"} 
                alt={people.name} 
                className="w-full h-64 object-cover"
              />
            </div>
            
            <div className="bg-muted/30 p-5 rounded-lg mb-6">
              <h3 className="font-medium mb-4">Быстрые факты</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Users className="h-5 w-5 mr-3 mt-0.5 text-finno-blue" />
                  <div>
                    <span className="block text-sm text-muted-foreground">Численность:</span>
                    <span className="font-medium">{people.population.toLocaleString()} человек</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <Globe className="h-5 w-5 mr-3 mt-0.5 text-finno-green" />
                  <div>
                    <span className="block text-sm text-muted-foreground">Язык:</span>
                    <span className="font-medium">{people.language}</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 mt-0.5 text-finno-orange" />
                  <div>
                    <span className="block text-sm text-muted-foreground">Группа:</span>
                    <span className="font-medium">
                      {people.group === "finnic" ? "Прибалтийско-финская" :
                       people.group === "ugric" ? "Угорская" :
                       people.group === "permian" ? "Пермская" :
                       "Волжская"}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
            
            <Button className="w-full mb-3" asChild>
              <Link to={`/map?focus=${people.id}`}>
                <MapPin className="mr-2 h-4 w-4" />
                Показать на карте
              </Link>
            </Button>
            
            <Button variant="outline" className="w-full" asChild>
              <Link to="/peoples">
                Все народы
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeopleDetailPage;
