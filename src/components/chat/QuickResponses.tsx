
import React from 'react';
import { Button } from '@/components/ui/button';

interface QuickResponsesProps {
  responses: string[];
  onSelectResponse: (response: string) => void;
}

const QuickResponses: React.FC<QuickResponsesProps> = ({ responses, onSelectResponse }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-4 mb-2">
      {responses.map((response) => (
        <Button 
          key={response} 
          variant="outline" 
          size="sm" 
          className="text-xs"
          onClick={() => onSelectResponse(response)}
        >
          {response}
        </Button>
      ))}
    </div>
  );
};

export default QuickResponses;
