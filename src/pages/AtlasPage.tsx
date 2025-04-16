import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
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
    people.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedPeopleData = selectedPeople 
    ? finnoUgricPeoples.find(p => p.id === selectedPeople) 
    : undefined;

  return (
    <div className="container py-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-finno-blue via-finno-green to-finno-orange bg-clip-text text-transparent">
            Интерактивный атлас финно-угорских народов
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Исследуйте богатую культуру, языки и традиции народов финно-угорской языковой семьи
            через интерактивную карту, древо языков и детальные описания.
          </p>
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
            <TabsTrigger value="map">Карта</TabsTrigger>
            <TabsTrigger value="tree">Древо языков</TabsTrigger>
            <TabsTrigger value="list">Список народов</TabsTrigger>
          </TabsList>
          
          <TabsContent value="map" className="space-y-6">
            <FinnoUgricMap 
              peoples={filteredPeoples}
              onPeopleSelect={handlePeopleSelect}
              selectedPeople={selectedPeople}
            />
            
            {selectedPeopleData && (
              <div className="max-w-md mx-auto mt-6">
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
              <div className="max-w-md mx-auto mt-6">
                <PeopleCard 
                  people={selectedPeopleData} 
                  onClick={() => handleOpenPeopleDetail(selectedPeopleData.id)}
                />
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="list">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPeoples.map((people) => (
                <PeopleCard
                  key={people.id}
                  people={people}
                  onClick={() => handleOpenPeopleDetail(people.id)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AtlasPage;