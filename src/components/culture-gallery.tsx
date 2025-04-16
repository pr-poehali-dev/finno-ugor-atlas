import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { FinnoUgricPeople } from "@/data/finno-ugric-peoples";

interface CultureGalleryProps {
  people: FinnoUgricPeople;
}

// Заглушки для примеров традиций
const getTraditionImages = (people: FinnoUgricPeople) => {
  return people.traditions.map((tradition, index) => ({
    id: `${people.id}-tradition-${index}`,
    title: tradition,
    imageUrl: "/placeholder.svg"
  }));
};

// Заглушки для примеров фольклора
const getFolkloreExamples = (people: FinnoUgricPeople) => [
  {
    id: `${people.id}-folklore-1`,
    title: "Эпические сказания",
    description: "Древние эпические произведения, отражающие мифологические представления и исторические события.",
    imageUrl: "/placeholder.svg"
  },
  {
    id: `${people.id}-folklore-2`,
    title: "Народные песни",
    description: "Песенный фольклор, связанный с обрядами, праздниками и повседневной жизнью.",
    imageUrl: "/placeholder.svg"
  },
  {
    id: `${people.id}-folklore-3`,
    title: "Сказки и легенды",
    description: "Народные сказки, отражающие мировоззрение, ценности и моральные нормы.",
    imageUrl: "/placeholder.svg"
  }
];

// Заглушки для примеров традиционной одежды
const getClothingExamples = (people: FinnoUgricPeople) => [
  {
    id: `${people.id}-clothing-1`,
    title: "Праздничный костюм",
    description: "Богато украшенная одежда для особых случаев и праздников.",
    imageUrl: "/placeholder.svg"
  },
  {
    id: `${people.id}-clothing-2`,
    title: "Повседневная одежда",
    description: "Функциональная одежда для повседневной работы и быта.",
    imageUrl: "/placeholder.svg"
  }
];

const CultureGallery: React.FC<CultureGalleryProps> = ({ people }) => {
  const traditions = getTraditionImages(people);
  const folklore = getFolkloreExamples(people);
  const clothing = getClothingExamples(people);

  return (
    <div className="space-y-6">
      <Tabs defaultValue="traditions" className="w-full">
        <TabsList className="w-full grid grid-cols-3 mb-6">
          <TabsTrigger value="traditions">Традиции</TabsTrigger>
          <TabsTrigger value="folklore">Фольклор</TabsTrigger>
          <TabsTrigger value="clothing">Одежда</TabsTrigger>
        </TabsList>
        
        <TabsContent value="traditions">
          <h3 className="text-xl font-bold mb-4">Культурные традиции</h3>
          
          <Carousel
            opts={{
              align: "start",
              loop: true
            }}
            className="w-full"
          >
            <CarouselContent>
              {traditions.map((tradition) => (
                <CarouselItem key={tradition.id} className="basis-full sm:basis-1/2 lg:basis-1/3 p-1">
                  <div className="tradition-card">
                    <img
                      src={tradition.imageUrl}
                      alt={tradition.title}
                    />
                    <div className="overlay">
                      <p className="title">{tradition.title}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
          
          <div 
            className="p-4 rounded-lg text-sm mt-6" 
            style={{ backgroundColor: `${people.color}15` }}
          >
            <p>
              <span className="font-medium">Традиционная культура {people.name}</span> сформировалась под влиянием природных условий, 
              контактов с соседними народами и исторических событий. Она включает в себя 
              разнообразные ритуалы, праздники и обряды, многие из которых сохранились до наших дней.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="folklore">
          <h3 className="text-xl font-bold mb-4">Устное народное творчество</h3>
          
          <div className="culture-showcase">
            {folklore.map((item) => (
              <div key={item.id} className="tradition-card">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                />
                <div className="overlay">
                  <p className="title">{item.title}</p>
                  <p className="description">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div 
            className="p-4 rounded-lg text-sm mt-6" 
            style={{ backgroundColor: `${people.color}15` }}
          >
            <p>
              <span className="font-medium">Фольклор {people.name}</span> отражает древние представления о мироздании,
              связь с природой и историческую память народа. В устном народном творчестве 
              сохранились уникальные языковые особенности и поэтические формы.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="clothing">
          <h3 className="text-xl font-bold mb-4">Традиционная одежда</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {clothing.map((item) => (
              <div key={item.id} className="tradition-card">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                />
                <div className="overlay">
                  <p className="title">{item.title}</p>
                  <p className="description">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div 
            className="p-4 rounded-lg text-sm mt-6" 
            style={{ backgroundColor: `${people.color}15` }}
          >
            <p>
              <span className="font-medium">Национальная одежда {people.name}</span> отличается особыми узорами, вышивкой и покроем.
              Традиционный костюм не только выполнял практическую функцию, но и указывал на социальный статус,
              возраст и семейное положение владельца.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CultureGallery;