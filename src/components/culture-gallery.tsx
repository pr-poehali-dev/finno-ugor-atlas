import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import type { FinnoUgricPeople } from "@/data/finno-ugric-peoples";

interface CultureGalleryProps {
  people: FinnoUgricPeople;
}

// Это заглушка для примеров изображений традиций
const getPlaceholderImages = (people: FinnoUgricPeople) => {
  return people.traditions.map((tradition, index) => ({
    id: `${people.id}-tradition-${index}`,
    title: tradition,
    imageUrl: "/placeholder.svg"
  }));
};

const CultureGallery: React.FC<CultureGalleryProps> = ({ people }) => {
  const traditions = getPlaceholderImages(people);

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">Культурные традиции</h3>
      
      <Carousel
        opts={{
          align: "start",
          loop: true
        }}
        className="w-full"
      >
        <CarouselContent>
          {traditions.map((tradition) => (
            <CarouselItem key={tradition.id} className="basis-full md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card>
                  <CardContent className="p-0 overflow-hidden rounded-lg">
                    <AspectRatio ratio={4/3}>
                      <img
                        src={tradition.imageUrl}
                        alt={tradition.title}
                        className="object-cover w-full h-full"
                      />
                    </AspectRatio>
                    <div 
                      className="p-3" 
                      style={{ backgroundColor: `${people.color}20` }}
                    >
                      <p className="font-medium">{tradition.title}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      
      <div 
        className="p-4 rounded-lg text-sm mt-2" 
        style={{ backgroundColor: `${people.color}10` }}
      >
        <p className="italic">
          Культура {people.name} имеет богатую историю с традициями, которые формировались на протяжении веков. 
          Эти традиции отражают особенности быта, верований и художественного самовыражения народа.
        </p>
      </div>
    </div>
  );
};

export default CultureGallery;