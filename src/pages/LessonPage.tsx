import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import VerbExercise from "@/components/verb-exercise";

const LessonPage = () => {
  return (
    <div className="container max-w-4xl mx-auto py-8">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Урок: Цифровая камера</h1>
        
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Крупнейшая цифровая камера в мире
            </h2>
            <p className="mb-4">
              В этом уроке вы узнаете о крупнейшей цифровой камере, установленной 
              в обсерватории в Чили, и выполните упражнение на глаголы английского языка.
            </p>
            
            <div className="my-6">
              <img 
                src="https://cdn.poehali.dev/files/72604e1f-ee6c-4947-a5b6-d9fbf3fe06c2.png" 
                alt="Упражнение на глаголы о цифровой камере" 
                className="w-full rounded-lg shadow-md"
              />
            </div>
            
            <h3 className="text-xl font-medium mt-8 mb-4">Выполните упражнение</h3>
            
            <VerbExercise />
            
            <Separator className="my-6" />
            
            <div className="prose max-w-none">
              <h3>О телескопе:</h3>
              <p>
                Large Synoptic Survey Telescope (LSST) - это революционная 
                3-миллиардная пиксельная камера, установленная в обсерватории 
                Веры С. Рубин в Чили. Она весит 2 721 кг (размером с небольшой автомобиль) 
                и способна делать снимки южного полушария неба с беспрецедентной детализацией.
              </p>
              <p>
                Астрономы планируют использовать эту камеру для создания цветного фильма 
                всего южного полушария неба, что поможет исследовать галактики и темную материю.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-between">
          <Button variant="outline">Предыдущий урок</Button>
          <Button>Следующий урок</Button>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;
