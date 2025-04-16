import React, { useState } from "react";
import { finnoUgricGroups } from "@/data/finno-ugric-peoples";
import type { FinnoUgricPeople } from "@/data/finno-ugric-peoples";

interface LanguageFamilyTreeProps {
  peoples: FinnoUgricPeople[];
  onPeopleSelect: (peopleId: string) => void;
  selectedPeople?: string;
}

const LanguageFamilyTree: React.FC<LanguageFamilyTreeProps> = ({
  peoples,
  onPeopleSelect,
  selectedPeople
}) => {
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);

  // Сортируем народы по группам
  const groupedPeoples = finnoUgricGroups.map(group => ({
    ...group,
    peoples: peoples.filter(p => p.group === group.id)
  }));

  return (
    <div className="p-4 relative rounded-lg">
      <h3 className="text-xl font-bold mb-6 text-center">Дерево финно-угорских языков</h3>
      
      <div className="h-[800px] relative">
        {/* Фоновые линии дерева */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
          {/* Основная вертикальная линия (ствол) */}
          <line 
            x1="50%" 
            y1="50" 
            x2="50%" 
            y2="400" 
            className="language-tree-line" 
          />
          
          {/* Горизонтальные линии к группам (основные ветви) */}
          {groupedPeoples.map((group, index) => {
            const y = 130 + index * 70;
            const isHovered = hoveredGroup === group.id;
            
            return (
              <g 
                key={group.id} 
                className={`language-branch ${isHovered ? 'opacity-100' : 'opacity-70'}`}
                onMouseEnter={() => setHoveredGroup(group.id)}
                onMouseLeave={() => setHoveredGroup(null)}
              >
                <line 
                  x1="50%" 
                  y1={y} 
                  x2="25%" 
                  y2={y} 
                  stroke={group.color} 
                  strokeWidth="2.5" 
                />
                
                {/* Линии к народам (подветви) */}
                {group.peoples.map((people, pIndex) => {
                  const peopleX = 25 - (pIndex + 1) * 5;
                  const peopleY = y - 20 + pIndex * 15;
                  
                  return (
                    <g key={people.id}>
                      <line 
                        x1="25%" 
                        y1={y} 
                        x2={`${peopleX}%`} 
                        y2={peopleY} 
                        stroke={group.color} 
                        strokeWidth="1.5" 
                      />
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>
        
        {/* Содержимое дерева */}
        <div className="relative z-10">
          {/* Корень дерева (Уральская языковая семья) */}
          <div className="absolute left-1/2 top-10 -translate-x-1/2">
            <div className="bg-finno-blue text-white px-4 py-2 rounded-lg font-medium w-48 text-center">
              Уральские языки
            </div>
            <div className="text-xs text-center mt-1 text-muted-foreground">Языковая семья</div>
          </div>
          
          {/* Финно-угорская ветвь */}
          <div className="absolute left-1/2 top-[80px] -translate-x-1/2">
            <div className="bg-finno-blue/80 text-white px-4 py-2 rounded-lg font-medium w-40 text-center">
              Финно-угорские
            </div>
          </div>
          
          {/* Группы языков */}
          {groupedPeoples.map((group, index) => {
            const top = 120 + index * 70;
            const isHovered = hoveredGroup === group.id;
            
            return (
              <div 
                key={group.id} 
                className="absolute flex"
                style={{ top: `${top}px`, left: 0, right: 0 }}
                onMouseEnter={() => setHoveredGroup(group.id)}
                onMouseLeave={() => setHoveredGroup(null)}
              >
                <div className="w-1/4 flex justify-end pr-6">
                  <div 
                    className="px-4 py-2 rounded-lg text-white font-medium"
                    style={{ 
                      backgroundColor: group.color,
                      opacity: isHovered ? 1 : 0.8,
                      transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                      transition: 'transform 0.2s, opacity 0.2s'
                    }}
                  >
                    {group.name} группа
                  </div>
                </div>
                
                <div className="w-3/4 pl-8">
                  <div className="flex flex-wrap gap-2 items-center">
                    {group.peoples.map((people) => {
                      const isPeopleSelected = selectedPeople === people.id;
                      
                      return (
                        <div
                          key={people.id}
                          className={`
                            px-3 py-1 rounded-full cursor-pointer transition-all
                            ${isPeopleSelected 
                              ? "text-white font-medium shadow-md" 
                              : "text-finno-dark bg-white/90"}
                          `}
                          style={{ 
                            backgroundColor: isPeopleSelected ? people.color : "white",
                            borderColor: people.color,
                            borderWidth: "2px",
                            transform: isPeopleSelected ? 'scale(1.1)' : 'scale(1)'
                          }}
                          onClick={() => onPeopleSelect(people.id)}
                        >
                          {people.name}
                          <span className="ml-1 text-xs opacity-70">
                            ({(people.population/1000).toFixed(0)}т.)
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* Самодийская ветвь (для полноты картины) */}
          <div 
            className="absolute left-1/2 top-[450px] -translate-x-1/2 opacity-50"
            style={{ pointerEvents: 'none' }}
          >
            <div className="border-2 border-dashed border-gray-400 px-4 py-2 rounded-lg font-medium w-40 text-center">
              Самодийские языки
            </div>
            <svg className="absolute left-1/2 -top-12 -translate-x-1/2 w-1 h-12">
              <line 
                x1="50%" 
                y1="0" 
                x2="50%" 
                y2="100%" 
                stroke="#9CA3AF" 
                strokeWidth="2" 
                strokeDasharray="4 4"
              />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-muted rounded-lg">
        <h4 className="font-medium mb-2">О финно-угорских языках</h4>
        <p className="text-sm text-muted-foreground">
          Финно-угорские языки — группа родственных языков, входящих в уральскую языковую семью. 
          Распространены в Северной, Восточной и Центральной Европе, а также в Западной Сибири. 
          Финно-угорские языки характеризуются богатой системой падежей, отсутствием грамматического рода 
          и агглютинативным строем.
        </p>
      </div>
    </div>
  );
};

export default LanguageFamilyTree;