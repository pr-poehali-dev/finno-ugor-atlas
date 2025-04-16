import React, { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { finnoUgricGroups } from "@/data/finno-ugric-peoples";
import type { FinnoUgricPeople } from "@/data/finno-ugric-peoples";

type FinnoUgricMapProps = {
  peoples: FinnoUgricPeople[];
  onPeopleSelect: (peopleId: string) => void;
  selectedPeople?: string;
};

const FinnoUgricMap: React.FC<FinnoUgricMapProps> = ({
  peoples,
  onPeopleSelect,
  selectedPeople,
}) => {
  const [hoveredPeople, setHoveredPeople] = useState<string | null>(null);
  const [activeGroups, setActiveGroups] = useState<string[]>(finnoUgricGroups.map(g => g.id));

  const toggleGroup = (groupId: string) => {
    if (activeGroups.includes(groupId)) {
      setActiveGroups(activeGroups.filter(g => g !== groupId));
    } else {
      setActiveGroups([...activeGroups, groupId]);
    }
  };

  const filteredPeoples = peoples.filter(p => activeGroups.includes(p.group));

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 mb-4">
        {finnoUgricGroups.map((group) => (
          <Button
            key={group.id}
            variant={activeGroups.includes(group.id) ? "default" : "outline"}
            className="rounded-full"
            style={{ 
              backgroundColor: activeGroups.includes(group.id) ? group.color : 'transparent',
              borderColor: group.color,
              color: activeGroups.includes(group.id) ? 'white' : group.color
            }}
            onClick={() => toggleGroup(group.id)}
          >
            {group.name}
          </Button>
        ))}
      </div>

      <div className="map-container bg-finno-beige rounded-lg p-4 relative h-[600px]">
        <div className="absolute inset-0 finno-pattern rounded-lg opacity-30"></div>
        
        {/* Контур карты Евразии для финно-угорского региона */}
        <svg
          viewBox="0 0 800 600"
          className="w-full h-full relative z-10"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Упрощенный контур северной Евразии */}
          <path
            d="M100,200 Q200,150 300,170 Q400,190 500,150 Q600,120 700,180 L700,350 Q600,370 500,400 Q400,420 300,380 Q200,350 100,380 Z"
            fill="none"
            stroke="rgba(76, 109, 151, 0.5)"
            strokeWidth="2"
          />
          
          {/* Добавляем крупные водоемы */}
          <ellipse cx="600" cy="300" rx="80" ry="50" fill="rgba(76, 109, 151, 0.2)" />
          <text x="600" y="300" fontSize="12" fill="#4C6D97" textAnchor="middle">Уральские горы</text>
          
          <ellipse cx="450" cy="200" rx="60" ry="30" fill="rgba(76, 109, 151, 0.2)" />
          <text x="450" y="200" fontSize="12" fill="#4C6D97" textAnchor="middle">Балтийское море</text>
          
          <ellipse cx="350" cy="350" rx="40" ry="25" fill="rgba(76, 109, 151, 0.2)" />
          <text x="350" y="350" fontSize="12" fill="#4C6D97" textAnchor="middle">Карпаты</text>
          
          {/* Точки на карте для каждого народа */}
          {filteredPeoples.map((people) => {
            const isSelected = selectedPeople === people.id;
            const isHovered = hoveredPeople === people.id;
            
            // Размер точки зависит от размера популяции
            const populationScale = Math.log(people.population) / 10;
            const baseSize = Math.max(5, Math.min(15, populationScale));
            const size = isSelected || isHovered ? baseSize * 1.5 : baseSize;
            
            const opacity = isSelected || isHovered ? 1 : 0.8;
            
            return (
              <g 
                key={people.id}
                onClick={() => onPeopleSelect(people.id)}
                onMouseEnter={() => setHoveredPeople(people.id)}
                onMouseLeave={() => setHoveredPeople(null)}
                className="finno-map-point"
              >
                <circle
                  cx={people.mapCoordinates.x}
                  cy={people.mapCoordinates.y}
                  r={size}
                  fill={people.color}
                  opacity={opacity}
                  className="transition-all duration-300"
                />
                
                {(isSelected || isHovered) && (
                  <circle
                    cx={people.mapCoordinates.x}
                    cy={people.mapCoordinates.y}
                    r={baseSize + 8}
                    fill="none"
                    stroke={people.color}
                    strokeWidth="2"
                    strokeDasharray="3,3"
                    className="animate-pulse"
                  />
                )}
                
                {(isSelected || isHovered) && (
                  <text
                    x={people.mapCoordinates.x}
                    y={people.mapCoordinates.y - baseSize - 10}
                    fontSize="14"
                    fontWeight="bold"
                    fill={people.color}
                    textAnchor="middle"
                    className="pointer-events-none"
                  >
                    {people.name}
                  </text>
                )}
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <circle
                      cx={people.mapCoordinates.x}
                      cy={people.mapCoordinates.y}
                      r={baseSize + 5}
                      fill="transparent"
                      className="cursor-pointer"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="space-y-1">
                      <p className="font-bold">{people.name}</p>
                      <p className="text-sm italic">{people.nativeName}</p>
                      <p className="text-sm">
                        Население: {people.population.toLocaleString()} чел.
                      </p>
                      <Badge 
                        style={{ backgroundColor: people.color }}
                        className="mt-1"
                      >
                        {finnoUgricGroups.find(g => g.id === people.group)?.name}
                      </Badge>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default FinnoUgricMap;