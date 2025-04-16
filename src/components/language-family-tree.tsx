import React from "react";
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
  return (
    <div className="p-4 bg-finno-beige rounded-lg">
      <h3 className="text-xl font-bold mb-4 text-center">Древо финно-угорских языков</h3>
      
      <div className="relative">
        {/* Линии древа */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
          {/* Основная вертикальная линия */}
          <line x1="50%" y1="0" x2="50%" y2="95%" stroke="#4C6D97" strokeWidth="2" strokeDasharray="5,5" />
          
          {/* Горизонтальные линии к группам */}
          {finnoUgricGroups.map((group, index) => {
            const y = 100 + index * 120;
            return (
              <line 
                key={group.id} 
                x1="50%" 
                y1={y} 
                x2="30%" 
                y2={y} 
                stroke={group.color} 
                strokeWidth="2" 
              />
            );
          })}
        </svg>
        
        {/* Содержимое древа */}
        <div className="relative z-10 pt-10">
          {/* Корень древа */}
          <div className="flex justify-center mb-8">
            <div className="bg-finno-blue text-white px-4 py-2 rounded-lg text-center w-48">
              <p className="font-medium">Уральские языки</p>
            </div>
          </div>
          
          {/* Ветви по группам */}
          <div className="space-y-16">
            {finnoUgricGroups.map((group) => {
              const groupPeoples = peoples.filter(p => p.group === group.id);
              
              return (
                <div key={group.id} className="flex">
                  <div 
                    className="w-1/3 text-center"
                    style={{ color: group.color }}
                  >
                    <div 
                      className="inline-block px-4 py-2 rounded-lg text-white font-medium"
                      style={{ backgroundColor: group.color }}
                    >
                      {group.name} группа
                    </div>
                  </div>
                  
                  <div className="w-2/3 flex flex-wrap gap-2 justify-start">
                    {groupPeoples.map((people) => (
                      <div
                        key={people.id}
                        className={`
                          px-3 py-1 rounded-full cursor-pointer transition-all
                          ${selectedPeople === people.id 
                            ? "text-white font-medium" 
                            : "text-finno-dark bg-white border-2"}
                        `}
                        style={{ 
                          backgroundColor: selectedPeople === people.id ? people.color : "white",
                          borderColor: people.color
                        }}
                        onClick={() => onPeopleSelect(people.id)}
                      >
                        {people.name}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageFamilyTree;