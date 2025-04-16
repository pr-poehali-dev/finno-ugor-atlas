import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Globe, Users, Languages } from "lucide-react";
import type { FinnoUgricPeople } from "@/data/finno-ugric-peoples";
import { finnoUgricGroups } from "@/data/finno-ugric-peoples";

interface PeopleCardProps {
  people: FinnoUgricPeople;
  onClick: () => void;
  compact?: boolean;
}

export const PeopleCard: React.FC<PeopleCardProps> = ({ 
  people, 
  onClick, 
  compact = false 
}) => {
  const group = finnoUgricGroups.find(g => g.id === people.group);

  return (
    <Card 
      className="finno-card overflow-hidden h-full"
      style={{ borderTopColor: people.color }}
    >
      <CardHeader 
        className="pb-3" 
        style={{ backgroundColor: `${people.color}10` }}
      >
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl md:text-2xl">
              {people.name}
            </CardTitle>
            <p className="text-sm italic text-muted-foreground">{people.nativeName}</p>
          </div>
          <Badge 
            style={{ backgroundColor: people.color }}
            className="ml-2 shrink-0"
          >
            {group?.name}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4 space-y-4">
        {!compact && (
          <div className="w-full h-36 bg-muted rounded-md overflow-hidden relative">
            <img 
              src={people.imageUrl || "/placeholder.svg"} 
              alt={people.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Globe size={18} className="text-muted-foreground" />
            <span>{people.region}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Languages size={18} className="text-muted-foreground" />
            <span>{people.language}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Users size={18} className="text-muted-foreground" />
            <span>{people.population.toLocaleString()} человек</span>
          </div>
        </div>
        
        {!compact && (
          <p className="text-sm text-muted-foreground line-clamp-3">
            {people.description}
          </p>
        )}
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={onClick} 
          className="w-full"
          style={{ backgroundColor: people.color }}
        >
          <span>Подробнее</span>
          <ChevronRight size={16} className="ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PeopleCard;