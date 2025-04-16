import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="text-center max-w-md p-6">
        <h1 className="text-9xl font-bold text-finno-blue mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Страница не найдена</h2>
        <p className="text-muted-foreground mb-8">
          К сожалению, страница, которую вы ищете, не существует или была перемещена.
        </p>
        <Button asChild>
          <Link to="/">
            <HomeIcon className="mr-2 h-4 w-4" />
            Вернуться на главную
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
