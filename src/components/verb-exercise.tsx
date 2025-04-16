import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, CheckCircle2 } from "lucide-react";

type VerbQuestion = {
  id: number;
  text: string;
  answer: string;
  options?: string[];
};

const VerbExercise = () => {
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});

  const questions: VerbQuestion[] = [
    {
      id: 1,
      text: "The world's largest ever digital camera has _______ operational in an observatory in Chile.",
      answer: "become"
    },
    {
      id: 2,
      text: "The Large Synoptic Survey Telescope camera was _______ by U.S. government agencies.",
      answer: "funded"
    },
    {
      id: 3,
      text: "The enormous device was _______ in the Vera C. Rubin Observatory in the South American nation.",
      answer: "installed"
    },
    {
      id: 4,
      text: "Astronomers will now _______ a period of testing.",
      answer: "commence"
    },
    {
      id: 5,
      text: "They will use the camera to _______ the southern hemisphere skies over the next decade.",
      answer: "observe"
    },
    {
      id: 6,
      text: "The Department of Energy's Office of Science _______ on how momentous the completion of the telescope was.",
      answer: "commented"
    }
  ];

  const handleAnswerChange = (questionId: number, value: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const checkAnswers = () => {
    let correctCount = 0;
    questions.forEach(q => {
      if (userAnswers[q.id]?.toLowerCase() === q.answer.toLowerCase()) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setShowResults(true);
  };

  const resetExercise = () => {
    setUserAnswers({});
    setShowResults(false);
    setScore(0);
  };

  return (
    <div className="space-y-4">
      {showResults ? (
        <Card className="bg-neutral-100 border-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Correct! Well done.</p>
                <p>Your score is {Math.round((score / questions.length) * 100)}%.</p>
              </div>
              <Button onClick={resetExercise}>OK</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="bg-neutral-100 p-4 rounded-lg">
            <p className="mb-2 font-medium">Заполните пропуски правильными формами глаголов:</p>
            {questions.map((q) => (
              <div key={q.id} className="mb-3">
                <div className="flex gap-1 flex-wrap">
                  {q.text.split(' ').map((word, i) => {
                    if (word === "_______") {
                      return (
                        <input
                          key={i}
                          type="text"
                          className="w-28 border-b-2 border-gray-400 bg-transparent focus:outline-none focus:border-blue-500"
                          value={userAnswers[q.id] || ""}
                          onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                          placeholder="введите глагол"
                        />
                      );
                    }
                    return <span key={i}>{word} </span>;
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <Button variant="secondary" onClick={resetExercise}>Сбросить</Button>
            <Button onClick={checkAnswers}>Проверить ответы</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default VerbExercise;
