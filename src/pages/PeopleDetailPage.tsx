import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Globe, Users, Languages, MapPin, BookOpen } from "lucide-react";
import { finnoUgricPeoples, finnoUgricGroups } from "@/data/finno-ugric-peoples";
import CultureGallery from "@/components/culture-gallery";

const PeopleDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [people, setPeople] = useState(finnoUgricPeoples.find(p => p.id === id));
  
  useEffect(() => {
    // Обновляем данные при изменении ID
    setPeople(finnoUgricPeoples.find(p => p.id === id));
    
    // Прокручиваем страницу вверх при переходе к новому народу
    window.scrollTo(0, 0);
  }, [id]);
  
  if (!people) {
    return (
      <div className="container py-16 text-center">
        <h2 className="text-2xl font-bold">Народ не найден</h2>
        <p className="text-muted-foreground mt-2">
          Информация о запрашиваемом народе отсутствует
        </p>
        <Button 
          onClick={() => navigate("/atlas")} 
          className="mt-6"
        >
          Вернуться к атласу
        </Button>
      </div>
    );
  }

  const group = finnoUgricGroups.find(g => g.id === people.group);
  
  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => navigate("/atlas")}
          >
            <ArrowLeft size={18} />
          </Button>
          
          <div>
            <h1 className="text-3xl font-bold">{people.name}</h1>
            <p className="text-lg text-muted-foreground">
              {people.nativeName}
            </p>
          </div>
          
          <Badge 
            className="ml-auto"
            style={{ backgroundColor: people.color }}
          >
            {group?.name} группа
          </Badge>
        </div>
        
        <div className="w-full h-64 bg-muted rounded-lg overflow-hidden">
          <img 
            src={people.imageUrl || "/placeholder.svg"} 
            alt={people.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Globe className="text-finno-blue" />
                <div>
                  <p className="text-sm text-muted-foreground">Регион</p>
                  <p className="font-medium">{people.region}</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-center gap-3">
                <Languages className="text-finno-green" />
                <div>
                  <p className="text-sm text-muted-foreground">Язык</p>
                  <p className="font-medium">{people.language}</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-center gap-3">
                <Users className="text-finno-orange" />
                <div>
                  <p className="text-sm text-muted-foreground">Численность</p>
                  <p className="font-medium">{people.population.toLocaleString()} человек</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="text-finno-blue" />
                <h3 className="text-lg font-medium">О народе</h3>
              </div>
              <p className="text-muted-foreground">
                {people.description}
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="culture" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-6">
            <TabsTrigger value="culture">Культура</TabsTrigger>
            <TabsTrigger value="language">Язык</TabsTrigger>
            <TabsTrigger value="history">История</TabsTrigger>
          </TabsList>
          
          <TabsContent value="culture" className="space-y-6">
            <CultureGallery people={people} />
          </TabsContent>
          
          <TabsContent value="language" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Язык</h3>
                <p className="text-muted-foreground">
                  {people.language} язык относится к {group?.name.toLowerCase()} группе финно-угорских языков.
                  Он является одним из важнейших элементов идентичности народа и хранителем уникальной культуры.
                </p>
                <div 
                  className="p-4 rounded-lg mt-4 space-y-2" 
                  style={{ backgroundColor: `${people.color}10` }}
                >
                  <h4 className="font-medium">Особенности языка:</h4>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>Богатая система падежей</li>
                    <li>Отсутствие грамматического рода</li>
                    <li>Агглютинативный строй</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">История</h3>
                <p className="text-muted-foreground">
                  История {people.name} тесно связана с этногенезом финно-угорских народов, 
                  их миграциями и развитием в различных природных и культурных условиях. 
                  Археологические находки и лингвистические исследования позволяют реконструировать
                  многие аспекты исторического развития.
                </p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div 
                    className="p-4 rounded-lg" 
                    style={{ backgroundColor: `${people.color}10` }}
                  >
                    <h4 className="font-medium">Этногенез</h4>
                    <p className="text-sm mt-2">
                      Формирование народа как этнической общности происходило на протяжении 
                      нескольких тысяч лет в результате сложных миграционных и ассимиляционных процессов.
                    </p>
                  </div>
                  
                  <div 
                    className="p-4 rounded-lg" 
                    style={{ backgroundColor: `${people.color}10` }}
                  >
                    <h4 className="font-medium">Современность</h4>
                    <p className="text-sm mt-2">
                      В настоящее время {people.name} сохраняют свою культурную самобытность, 
                      развивая традиции и адаптируя их к современным условиям жизни.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PeopleDetailPage;