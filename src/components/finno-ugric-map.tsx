import React, { useState, useRef, useEffect } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { finnoUgricGroups } from "@/data/finno-ugric-peoples";
import type { FinnoUgricPeople } from "@/data/finno-ugric-peoples";
import { ZoomIn, ZoomOut, Maximize } from "lucide-react";

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
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

  const toggleGroup = (groupId: string) => {
    if (activeGroups.includes(groupId)) {
      setActiveGroups(activeGroups.filter(g => g !== groupId));
    } else {
      setActiveGroups([...activeGroups, groupId]);
    }
  };

  const filteredPeoples = peoples.filter(p => activeGroups.includes(p.group));

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 2.5));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.75));
  };

  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) { // Left click only
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      setPan(prev => ({ x: prev.x + dx, y: prev.y + dy }));
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (selectedPeople) {
      const selectedPeopleData = peoples.find(p => p.id === selectedPeople);
      if (selectedPeopleData) {
        // Center map on selected people
        const svg = svgRef.current;
        if (svg) {
          const viewBox = svg.viewBox.baseVal;
          const centerX = viewBox.width / 2;
          const centerY = viewBox.height / 2;
          
          setPan({
            x: -(selectedPeopleData.mapCoordinates.x - centerX),
            y: -(selectedPeopleData.mapCoordinates.y - centerY)
          });
        }
      }
    }
  }, [selectedPeople, peoples]);

  // Ensure we stop dragging even when mouse leaves the SVG
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, []);

  return (
    <div className="space-y-4">
      <div className="ethnic-group-legend">
        {finnoUgricGroups.map((group) => (
          <Button
            key={group.id}
            variant={activeGroups.includes(group.id) ? "default" : "outline"}
            className="rounded-full text-xs sm:text-sm"
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

      <div className="interactive-map">
        <div className="absolute inset-0 finno-pattern opacity-30"></div>
        
        <div className="absolute top-2 right-2 z-10 flex flex-col gap-2">
          <Button 
            size="icon" 
            variant="outline" 
            className="bg-white/80" 
            onClick={handleZoomIn}
          >
            <ZoomIn size={18} />
          </Button>
          <Button 
            size="icon" 
            variant="outline" 
            className="bg-white/80" 
            onClick={handleZoomOut}
          >
            <ZoomOut size={18} />
          </Button>
          <Button 
            size="icon" 
            variant="outline" 
            className="bg-white/80" 
            onClick={handleReset}
          >
            <Maximize size={18} />
          </Button>
        </div>
        
        <svg
          ref={svgRef}
          viewBox="0 0 800 600"
          className={`${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          preserveAspectRatio="xMidYMid meet"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
            {/* Контур суши */}
            <path
              className="land-path"
              d="M100,150 Q200,120 300,130 Q400,140 500,110 Q600,100 700,150 L700,450 Q600,480 500,460 Q400,450 300,440 Q200,430 100,450 Z"
            />
            
            {/* Водоемы */}
            <ellipse cx="250" cy="200" rx="70" ry="40" className="water-body" />
            <text x="250" y="200" fontSize="10" fill="#4C6D97" textAnchor="middle">Балтийское море</text>
            
            <ellipse cx="350" cy="280" rx="50" ry="30" className="water-body" />
            <text x="350" y="280" fontSize="10" fill="#4C6D97" textAnchor="middle">Ладожское озеро</text>
            
            <ellipse cx="600" cy="220" rx="50" ry="70" className="water-body" />
            <text x="600" y="220" fontSize="10" fill="#4C6D97" textAnchor="middle">Уральские горы</text>
            
            <path 
              d="M450,350 Q480,370 510,360 Q540,350 550,370 Q560,390 580,380 Q600,370 620,390" 
              fill="none" 
              stroke="#9CC0E7" 
              strokeWidth="5" 
              strokeDasharray="1,2"
              className="opacity-70"
            />
            <text x="535" y="395" fontSize="10" fill="#4C6D97" textAnchor="middle">Волга</text>
            
            {/* Граница Европа-Азия */}
            <path 
              d="M600,150 L600,450" 
              stroke="#4C6D97" 
              strokeWidth="1.5" 
              strokeDasharray="5,5" 
              className="opacity-50"
            />
            <text 
              x="600" 
              y="470" 
              fontSize="10" 
              fill="#4C6D97" 
              textAnchor="middle"
              className="opacity-70"
            >
              Европа | Азия
            </text>
            
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
                    <>
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
                      
                      <text
                        x={people.mapCoordinates.x}
                        y={people.mapCoordinates.y + baseSize + 15}
                        fontSize="12"
                        fill={people.color}
                        textAnchor="middle"
                        className="pointer-events-none opacity-80"
                      >
                        {(people.population / 1000).toFixed(0)}т. чел.
                      </text>
                    </>
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
                      <div className="space-y-1 p-1">
                        <p className="font-bold text-base">{people.name}</p>
                        <p className="text-sm italic">{people.nativeName}</p>
                        <div className="flex justify-between items-center gap-4 text-sm">
                          <span>Население:</span>
                          <span className="font-medium">{people.population.toLocaleString()} чел.</span>
                        </div>
                        <Badge 
                          style={{ backgroundColor: people.color }}
                          className="mt-1 w-full justify-center"
                        >
                          {finnoUgricGroups.find(g => g.id === people.group)?.name}
                        </Badge>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </g>
              );
            })}
          </g>
        </svg>
      </div>
      
      <div className="text-center text-xs text-muted-foreground">
        <p>Используйте мышь для перемещения карты и кнопки масштабирования для изменения размера</p>
      </div>
    </div>
  );
};

export default FinnoUgricMap;