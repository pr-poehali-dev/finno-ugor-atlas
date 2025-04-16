import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Globe, Users, Languages, MapPin, BookOpen, Home, Camera, History } from "lucide-react";
import { finnoUgricPeoples, finnoUgricGroups } from "@/data/finno-ugric-peoples";
import CultureGallery from "@/components/culture-gallery";
import DialectMap from "@/components/dialect-map";

const PeopleDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [people, setPeople] = useState(finnoUgricPeoples.find(p => p.id === id));
  
  // Находим следующий и предыдущий народы для навигации
  const currentIndex = finnoUgricPeoples.findIndex(p => p.id === id);
  const prevPeople = currentIndex > 0 ? finnoUgricPeoples[currentIndex - 1] : null;
  const nextPeople = currentIndex < finnoUgricPeoples.length - 1 ? finnoUgricPeoples[currentIndex + 1] : null;
  
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
        <div className="flex flex-wrap items-center gap-4">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => navigate("/atlas")}
            className="shrink-0"
          >
            <ArrowLeft size={18} />
          </Button>
          
          <div className="flex-grow">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-3xl font-bold">{people.name}</h1>
              <Badge 
                className="ml-auto"
                style={{ backgroundColor: people.color }}
              >
                {group?.name} группа
              </Badge>
            </div>
            <p className="text-lg text-muted-foreground">
              {people.nativeName}
            </p>
          </div>
          
          <div className="flex gap-2 ml-auto">
            {prevPeople && (
              <Button 
                variant="outline" 
                onClick={() => navigate(`/atlas/${prevPeople.id}`)}
                className="text-xs"
                style={{ borderColor: prevPeople.color, color: prevPeople.color }}
              >
                ← {prevPeople.name}
              </Button>
            )}
            
            {nextPeople && (
              <Button 
                variant="outline" 
                onClick={() => navigate(`/atlas/${nextPeople.id}`)}
                className="text-xs"
                style={{ borderColor: nextPeople.color, color: nextPeople.color }}
              >
                {nextPeople.name} →
              </Button>
            )}
          </div>
        </div>
        
        <div className="w-full h-64 sm:h-80 bg-muted rounded-lg overflow-hidden">
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
              
              <div className="pt-4">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate("/atlas")}
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  Показать на карте
                </Button>
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
              
              <div 
                className="mt-4 p-3 rounded-lg" 
                style={{ backgroundColor: `${people.color}10` }}
              >
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Традиционные занятия
                </h4>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>Охота и рыболовство</li>
                  <li>Земледелие и скотоводство</li>
                  <li>Традиционные ремесла</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="culture" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-6">
            <TabsTrigger value="culture">
              <Camera className="mr-2 h-4 w-4" />
              Культура
            </TabsTrigger>
            <TabsTrigger value="language">
              <Languages className="mr-2 h-4 w-4" />
              Язык
            </TabsTrigger>
            <TabsTrigger value="history">
              <History className="mr-2 h-4 w-4" />
              История
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="culture" className="space-y-6">
            <CultureGallery people={people} />
          </TabsContent>
          
          <TabsContent value="language" className="space-y-6">
            <DialectMap people={people} />
          </TabsContent>
          
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Историческое развитие</h3>
                <div className="space-y-4">
                  <div className="relative pl-6 pb-6 border-l-2" style={{ borderColor: people.color }}>
                    <div className="absolute top-0 left-0 w-4 h-4 -translate-x-1/2 rounded-full bg-white" style={{ borderColor: people.color, borderWidth: 2 }}></div>
                    <h4 className="text-lg font-medium">Древнейший период</h4>
                    <p className="text-sm text-muted-foreground mt-2">
                      Формирование {people.name} как этнической общности происходило на протяжении 
                      нескольких тысяч лет. Археологические находки указывают на раннее 
                      присутствие финно-угорских племен в данной местности.
                    </p>
                  </div>
                  
                  <div className="relative pl-6 pb-6 border-l-2" style={{ borderColor: people.color }}>
                    <div className="absolute top-0 left-0 w-4 h-4 -translate-x-1/2 rounded-full bg-white" style={{ borderColor: people.color, borderWidth: 2 }}></div>
                    <h4 className="text-lg font-medium">Средние века</h4>
                    <p className="text-sm text-muted-foreground mt-2">
                      В средневековый период происходило укрепление этнической идентичности,
                      формирование уникальных культурных черт и традиций. В это время народ 
                      активно взаимодействовал с соседними культурами.
                    </p>
                  </div>
                  
                  <div className="relative pl-6 pb-6 border-l-2" style={{ borderColor: people.color }}>
                    <div className="absolute top-0 left-0 w-4 h-4 -translate-x-1/2 rounded-full bg-white" style={{ borderColor: people.color, borderWidth: 2 }}></div>
                    <h4 className="text-lg font-medium">Современный период</h4>
                    <p className="text-sm text-muted-foreground mt-2">
                      В современную эпоху происходят процессы сохранения и возрождения традиционной культуры,
                      языка и идентичности. Развиваются национальные институты, образование на родном языке,
                      литература и искусство.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="p-6 rounded-lg bg-muted">
          <h3 className="text-lg font-medium mb-3">Другие финно-угорские народы</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {finnoUgricPeoples
              .filter(p => p.id !== people.id)
              .slice(0, 5)
              .map(p => (
                <Button 
                  key={p.id}
                  variant="outline"
                  className="justify-start px-2 py-1 h-auto"
                  style={{ borderColor: p.color, color: p.color }}
                  onClick={() => navigate(`/atlas/${p.id}`)}
                >
                  <span className="truncate">{p.name}</span>
                </Button>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeopleDetailPage;