import React, { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion } from "framer-motion";

type Location = {
  id: string;
  name: string;
  x: number;
  y: number;
  population: number;
  group: string;
};

type AtlasMapProps = {
  locations: Location[];
  onLocationSelect: (locationId: string) => void;
  selectedLocation?: string;
};

export const AtlasMap: React.FC<AtlasMapProps> = ({
  locations,
  onLocationSelect,
  selectedLocation,
}) => {
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

  return (
    <div className="map-container bg-finno-beige rounded-lg p-4 relative">
      <div className="absolute inset-0 finno-pattern rounded-lg"></div>
      <svg
        viewBox="0 0 1000 600"
        className="w-full h-full relative z-10"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Упрощенный контур карты */}
        <path
          d="M100,100 L900,100 L900,500 L100,500 Z"
          fill="none"
          stroke="rgba(76, 109, 151, 0.3)"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
        
        {/* Точки на карте для каждой локации */}
        {locations.map((location) => {
          const isSelected = selectedLocation === location.id;
          const isHovered = hoveredLocation === location.id;
          
          // Размер точки зависит от размера популяции
          const size = Math.max(8, Math.min(20, 8 + location.population / 10000));
          
          // Цвет в зависимости от группы народов
          let color = "#4C6D97"; // По умолчанию синий
          if (location.group === "ugric") color = "#5B8C71"; // Зеленый для угорских
          if (location.group === "permian") color = "#E5864E"; // Оранжевый для пермских
          if (location.group === "volga") color = "#D45B5B"; // Красный для волжских
          
          return (
            <g 
              key={location.id}
              onClick={() => onLocationSelect(location.id)}
              onMouseEnter={() => setHoveredLocation(location.id)}
              onMouseLeave={() => setHoveredLocation(null)}
              className="finno-map-point"
            >
              <motion.circle
                cx={location.x}
                cy={location.y}
                r={size}
                fill={color}
                initial={{ opacity: 0.8 }}
                animate={{ 
                  r: isSelected || isHovered ? size * 1.3 : size,
                  opacity: isSelected || isHovered ? 1 : 0.8 
                }}
                transition={{ duration: 0.3 }}
              />
              
              {isSelected && (
                <circle
                  cx={location.x}
                  cy={location.y}
                  r={size + 10}
                  fill="none"
                  stroke={color}
                  strokeWidth="2"
                  strokeDasharray="3,3"
                />
              )}
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <circle
                    cx={location.x}
                    cy={location.y}
                    r={size + 5}
                    fill="transparent"
                    className="cursor-pointer"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-medium">{location.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Население: {location.population.toLocaleString()} чел.
                  </p>
                </TooltipContent>
              </Tooltip>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default AtlasMap;
