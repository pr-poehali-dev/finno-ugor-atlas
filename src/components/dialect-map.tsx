import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { FinnoUgricPeople } from "@/data/finno-ugric-peoples";
import { languageFeatures } from "@/data/finno-ugric-peoples";

interface DialectMapProps {
  people: FinnoUgricPeople;
}

// Примеры диалектов для разных групп
const getDialects = (people: FinnoUgricPeople) => {
  const dialects: {name: string; region: string; features: string[]}[] = [];
  
  switch(people.group) {
    case "baltic":
      dialects.push(
        { name: "Западный диалект", region: "Западные регионы", features: ["Особые гласные звуки", "Упрощенная падежная система"] },
        { name: "Восточный диалект", region: "Восточные регионы", features: ["Сохранение архаичных форм", "Дополнительные падежи"] },
        { name: "Северный диалект", region: "Северные области", features: ["Влияние саамских языков", "Специфические согласные"] }
      );
      break;
    case "ugric":
      dialects.push(
        { name: "Центральный диалект", region: "Центральные области", features: ["Стандартные формы", "Основа литературного языка"] },
        { name: "Западный диалект", region: "Западные регионы", features: ["Славянские заимствования", "Упрощенная морфология"] },
        { name: "Восточный диалект", region: "Восточные области", features: ["Тюркские заимствования", "Сохранение древних форм"] }
      );
      break;
    case "permian":
      dialects.push(
        { name: "Северный диалект", region: "Северные районы", features: ["Особая фонетика", "Архаичная лексика"] },
        { name: "Южный диалект", region: "Южные районы", features: ["Тюркское влияние", "Упрощение падежей"] }
      );
      break;
    case "volga":
      dialects.push(
        { name: "Горный диалект", region: "Возвышенности", features: ["Особый вокализм", "Консервативная грамматика"] },
        { name: "Луговой диалект", region: "Долины рек", features: ["Инновационная фонетика", "Заимствования из русского"] }
      );
      break;
    case "saami":
      dialects.push(
        { name: "Северо-саамский", region: "Северная Скандинавия", features: ["Развитая падежная система", "Скандинавские заимствования"] },
        { name: "Кольско-саамский", region: "Кольский полуостров", features: ["Русские заимствования", "Особая интонация"] }
      );
      break;
  }
  
  return dialects;
};

const DialectMap: React.FC<DialectMapProps> = ({ people }) => {
  const [activeDialect, setActiveDialect] = useState<string | null>(null);
  const dialects = getDialects(people);
  
  const groupFeatures = languageFeatures[people.group] || [];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">Диалекты и особенности языка</h3>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Основные черты {people.language} языка</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            {groupFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
      
      <div>
        <h4 className="font-medium mb-3">Диалектное разнообразие</h4>
        
        <div className="relative h-64 p-4 bg-muted rounded-lg overflow-hidden">
          {/* Схематичная карта диалектов */}
          <div className="relative w-full h-full">
            {/* Базовый контур */}
            <div className="absolute inset-0 border-2 border-dashed rounded-lg" style={{ borderColor: people.color, opacity: 0.4 }}></div>
            
            {/* Размещаем диалекты на "карте" */}
            {dialects.map((dialect, index) => {
              // Рассчитываем позиции для диалектов
              const positions = [
                { left: '20%', top: '30%' },
                { left: '60%', top: '25%' },
                { left: '40%', top: '60%' },
              ];
              const pos = positions[index % positions.length];
              
              const isActive = activeDialect === dialect.name;
              
              return (
                <Tooltip key={dialect.name}>
                  <TooltipTrigger asChild>
                    <div 
                      className="homeland-marker cursor-pointer"
                      style={{ 
                        left: pos.left, 
                        top: pos.top,
                        borderColor: people.color,
                        background: isActive ? people.color : 'white'
                      }}
                      onMouseEnter={() => setActiveDialect(dialect.name)}
                      onMouseLeave={() => setActiveDialect(null)}
                    >
                      {isActive && (
                        <div className="homeland-marker" style={{ 
                          borderColor: people.color,
                          background: 'transparent',
                          width: '16px',
                          height: '16px'
                        }}></div>
                      )}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="space-y-1">
                      <p className="font-bold">{dialect.name}</p>
                      <p className="text-xs text-muted-foreground">{dialect.region}</p>
                      <div className="pt-1">
                        <p className="text-xs font-medium">Особенности:</p>
                        <ul className="text-xs list-disc pl-4 pt-1">
                          {dialect.features.map((feature, i) => (
                            <li key={i}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              );
            })}
            
            {/* Названия диалектов */}
            {dialects.map((dialect, index) => {
              const positions = [
                { left: '20%', top: '30%' },
                { left: '60%', top: '25%' },
                { left: '40%', top: '60%' },
              ];
              const pos = positions[index % positions.length];
              const offsetY = 15;
              
              return (
                <div 
                  key={`label-${dialect.name}`}
                  className="absolute text-xs font-medium pointer-events-none"
                  style={{ 
                    left: pos.left, 
                    top: `calc(${pos.top} + ${offsetY}px)`,
                    transform: 'translateX(-50%)',
                    color: people.color
                  }}
                >
                  {dialect.name}
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-2">
          {dialects.map((dialect) => (
            <span 
              key={dialect.name}
              className="dialect-pill"
              style={{ 
                backgroundColor: activeDialect === dialect.name ? people.color : `${people.color}20`,
                color: activeDialect === dialect.name ? 'white' : 'inherit'
              }}
              onMouseEnter={() => setActiveDialect(dialect.name)}
              onMouseLeave={() => setActiveDialect(null)}
            >
              {dialect.name}
            </span>
          ))}
        </div>
      </div>
      
      <Card style={{ backgroundColor: `${people.color}08` }}>
        <CardContent className="p-4">
          <p className="text-sm">
            <span className="font-medium">{people.language} язык</span> является важнейшим 
            элементом культурной идентичности {people.name}. Несмотря на диалектные различия, 
            язык сохраняет единую структуру и основные особенности, характерные для 
            {' '}{finnoUgricGroups.find(g => g.id === people.group)?.name.toLowerCase()} группы.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DialectMap;