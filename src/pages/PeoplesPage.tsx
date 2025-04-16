import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { peoples } from "@/data/peoples";
import CultureCard from "@/components/culture-card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const PeoplesPage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPeoples = peoples.filter((people) => {
    const matchesGroup = filter === "all" || people.group === filter;
    const matchesSearch = people.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         people.language.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGroup && matchesSearch;
  });
  
  const handlePeopleClick = (id: string) => {
    navigate(`/peoples/${id}`);
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Финно-угорские народы</h1>
        <p className="text-muted-foreground max-w-3xl mb-8">
          Финно-угорские народы — группа народов, говорящих на финно-угорских языках, которые относятся к уральской языковой семье. Познакомьтесь с их богатой культурой, традициями и историей.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative w-full md:w-2/3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск по названию или языку..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full md:w-1/3">
              <SelectValue placeholder="Фильтровать по группе" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">Все группы</SelectItem>
                <SelectItem value="finnic">Прибалтийско-финские</SelectItem>
                <SelectItem value="ugric">Угорские</SelectItem>
                <SelectItem value="permian">Пермские</SelectItem>
                <SelectItem value="volga">Волжские</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {filteredPeoples.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPeoples.map((people) => (
            <CultureCard
              key={people.id}
              id={people.id}
              title={people.name}
              description={people.description}
              population={people.population}
              language={people.language}
              image={people.imageUrl}
              color={people.color}
              onClick={() => handlePeopleClick(people.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-lg font-medium mb-2">Народы не найдены</h3>
          <p className="text-muted-foreground mb-6">Попробуйте изменить параметры поиска</p>
          <Button onClick={() => {setFilter("all"); setSearchQuery("")}}>
            Сбросить фильтры
          </Button>
        </div>
      )}
    </div>
  );
};

export default PeoplesPage;
