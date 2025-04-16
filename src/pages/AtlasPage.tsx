import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search, BookOpen, Globe, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { finnoUgricPeoples } from "@/data/finno-ugric-peoples";
import FinnoUgricMap from "@/components/finno-ugric-map";
import PeopleCard from "@/components/people-card";
import LanguageFamilyTree from "@/components/language-family-tree";
import { useNavigate } from "react-router-dom";

const AtlasPage = () => {
  const [selectedPeople, setSelectedPeople] = useState<string | undefined>();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handlePeopleSelect = (peopleId: string) => {
    setSelectedPeople(peopleId);
  };

  const handleOpenPeopleDetail = (peopleId: string) => {
    navigate(`/atlas/${peopleId}`);
  };

  const filteredPeoples = finnoUgricPeoples.filter(people => 
    people.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    people.nativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    people.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
    people.language.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedPeopleData = selectedPeople 
    ? finnoUgricPeoples.find(p => p.id === selectedPeople) 
    : undefined;

  return (
    <div className="container py-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-4 hero-pattern py-10 px-4 rounded-xl">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-finno-blue via-finno-green to-finno-orange bg-clip-text text-transparent">
            Интерактивный атлас финно-угорских народов
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Исследуйте богатую культуру, языки и традиции народов финно-угорской языковой семьи
            через интерактивную карту, древо языков и детальные описания.
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <Button 
              onClick={() => navigate('/atlas/finnish')}
              leftIcon={<Globe className="mr-2 h-4 w-4" />}
              className="bg-finno-blue"
            >
              <Globe className="mr-2 h-4 w-4" />
              Начать исследование
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/about')}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              О проекте
            </Button>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Поиск народов, регионов или языков..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="map" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-6">
            <TabsTrigger value="map">
              <Globe className="mr-2 h-4 w-4" />
              Карта
            </TabsTrigger>
            <TabsTrigger value="tree">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 1v12m-5-5 5 5 5-5M3 19h14" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              Древо языков
            </TabsTrigger>
            <TabsTrigger value="list">
              <BookOpen className="mr-2 h-4 w-4" />
              Список народов
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="map" className="space-y-6">
            <FinnoUgricMap 
              peoples={filteredPeoples}
              onPeopleSelect={handlePeopleSelect}
              selectedPeople={selectedPeople}
            />
            
            {selectedPeopleData && (
              <div className="max-w-md mx-auto mt-6 animate-fadeIn">
                <PeopleCard 
                  people={selectedPeopleData} 
                  onClick={() => handleOpenPeopleDetail(selectedPeopleData.id)}
                />
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="tree">
            <LanguageFamilyTree 
              peoples={filteredPeoples}
              onPeopleSelect={handlePeopleSelect}
              selectedPeople={selectedPeople}
            />
            
            {selectedPeopleData && (
              <div className="max-w-md mx-auto mt-6 animate-fadeIn">
                <PeopleCard 
                  people={selectedPeopleData} 
                  onClick={() => handleOpenPeopleDetail(selectedPeopleData.id)}
                />
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="list">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPeoples.length > 0 ? (
                filteredPeoples.map((people) => (
                  <PeopleCard
                    key={people.id}
                    people={people}
                    onClick={() => handleOpenPeopleDetail(people.id)}
                  />
                ))
              ) : (
                <div className="col-span-3 text-center py-12">
                  <Sparkles className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium">Ничего не найдено</h3>
                  <p className="text-muted-foreground mt-2">
                    Попробуйте изменить параметры поиска
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AtlasPage;