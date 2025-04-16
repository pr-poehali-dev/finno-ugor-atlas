import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type CultureCardProps = {
  id: string;
  title: string;
  description: string;
  population: number;
  language: string;
  image: string;
  color?: "blue" | "green" | "orange" | "red";
  onClick: () => void;
};

export const CultureCard: React.FC<CultureCardProps> = ({
  title,
  description,
  population,
  language,
  image,
  color = "blue",
  onClick,
}) => {
  const colorClasses = {
    blue: "border-finno-blue",
    green: "border-finno-green",
    orange: "border-finno-orange",
    red: "border-finno-red",
  };

  return (
    <Card 
      className={`finno-card overflow-hidden ${colorClasses[color]} border-l-4`}
    >
      <div className="relative h-40 w-full">
        <img 
          src={image || "/placeholder.svg"} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="flex items-center justify-between">
          <span>Население: {population.toLocaleString()} чел.</span>
          <span className="text-finno-dark font-medium">{language}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {description}
        </p>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={onClick}
        >
          Подробнее <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default CultureCard;
