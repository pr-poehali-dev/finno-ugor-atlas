import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AtlasMap from "@/components/ui/atlas-map";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { peoples } from "@/data/peoples";
import { InfoIcon, MapIcon, ListIcon } from "lucide-react";

const MapPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const focusId = searchParams.get("focus");
  const [selectedLocation, setSelectedLocation] = useState<string | undefined>(focusId || undefined);
  const [activeTab, setActiveTab] = useState("map");
  
  // Преобразуем данные для карты
  const mapLocations = peoples.map(people => ({
    id: people.id,
    name: people.name,
    x: people.location.x,
    y: people.location.y,
    population: people.population,
    group: people.group
  }));
  
  // Выбранный народ
  const selectedPeople = selectedLocation ? 
    peoples.find(people => people.id === selectedLocation) : undefined;
  
  // Обработчик выбора локации на карте
  const handleLocationSelect = (locationId: string) => {
    setSelectedLocation(locationId);
  };
  
  // Обработчик перехода на страницу детального просмотра
  const handleViewDetails = () => {
    if (selectedLocation) {
      navigate(`/peoples/${selectedLocation}`);
    }
  };
  
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-2">Карта финно-угорских народов</h1>
      <p className="text-muted-foreground mb-6">
        Интерактивная карта распространения финно-угорских народов. Нажмите на точку, чтобы узнать подробнее.
      </p>
      
      <div className="lg:hidden mb-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full">
            <TabsTrigger value="map" className="flex-1">
              <MapIcon className="h-4 w-4 mr-2" />
              Карта
            </TabsTrigger>
            <TabsTrigger value="info" className="flex-1">
              <InfoIcon className="h-4 w-4 mr-2" />
              Информация
            </TabsTrigger>
            <TabsTrigger value="list" className="flex-1">
              <ListIcon className="h-4 w-4 mr-2" />
              Список
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="map" className="mt-4">
            <div className="h-[60vh]">
              <AtlasMap 
                locations={mapLocations}
                onLocationSelect={handleLocationSelect}
                selectedLocation={selectedLocation}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="info" className="mt-4">
            {selectedPeople ? (
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-2">{selectedPeople.name}</h2>
                  <p className="text-sm text-muted-foreground mb-2">
                    Население: {selectedPeople.population.toLocaleString()} человек
                  </p>
                  <p className="text-sm mb-4">{selectedPeople.description}</p>
                  <Button onClick={handleViewDetails} className="w-full">
                    Подробнее
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground">
                  Выберите народ на карте для отображения информации
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="list" className="mt-4">
            <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2">
              {peoples.map((people) => (
                <button
                  key={people.id}
                  className={`w-full text-left p-3 rounded-md border transition-colors ${
                    selectedLocation === people.id 
                      ? "border-primary bg-primary/5" 
                      : "border-border hover:bg-muted/40"
                  }`}
                  onClick={() => setSelectedLocation(people.id)}
                >
                  <span className="font-medium">{people.name}</span>
                  <span className="text-sm text-muted-foreground block">
                    {people.language}
                  </span>
                </button>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="hidden lg:grid grid-cols-3 gap-8">
        <div className="col-span-2 h-[70vh]">
          <AtlasMap 
            locations={mapLocations}
            onLocationSelect={handleLocationSelect}
            selectedLocation={selectedLocation}
          />
        </div>
        
        <div>
          <div className="sticky top-24 space-y-6">
            <Card>
              <CardContent className="pt-6">
                {selectedPeople ? (
                  <>
                    <h2 className="text-xl font-semibold mb-2">{selectedPeople.name}</h2>
                    <p className="text-sm text-muted-foreground mb-1">
                      Население: {selectedPeople.population.toLocaleString()} человек
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Язык: {selectedPeople.language}
                    </p>
                    <p className="text-sm mb-4">{selectedPeople.description}</p>
                    <Button onClick={handleViewDetails} className="w-full">
                      Подробнее
                    </Button>
                  </>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">
                      Выберите народ на карте для отображения информации
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <div className="space-y-1.5 max-h-[40vh] overflow-y-auto pr-2">
              <h3 className="font-medium mb-2">Все народы</h3>
              {peoples.map((people) => (
                <button
                  key={people.id}
                  className={`w-full text-left p-2 rounded-md transition-colors ${
                    selectedLocation === people.id 
                      ? "bg-primary/10 text-primary" 
                      : "hover:bg-muted/40"
                  }`}
                  onClick={() => setSelectedLocation(people.id)}
                >
                  {people.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
