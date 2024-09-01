import { useState } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from './ui/select';

import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface TravelPreferences {
  destinationType: string;
  budget: number | '';
  activities: string;
  climate: string;
  [key: string]: string | number | string[];
}

interface UserPreferencesFormProps {
  setRecommendations: (recommendations: string | null) => void;
}

const UserPreferencesForm: React.FC<UserPreferencesFormProps> = ({
  setRecommendations,
}) => {
  const [preferences, setPreferences] = useState<TravelPreferences>({
    destinationType: '',
    budget: '',
    activities: '',
    climate: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPreferences({
      ...preferences,
      [name]: name === 'budget' ? (value === '' ? '' : Number(value)) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formattedPreferences = {
        ...preferences,
        activities: preferences.activities
          .split(',')
          .map((item) => item.trim()),
      };

      const response = await fetch('/api/generateTravelRecommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userPreferences: formattedPreferences,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate travel recommendations');
      }

      const data = await response.json();
      setRecommendations(data.recommendations);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
      setRecommendations(null);
    } finally {
      setLoading(false);
    }
  };

  const formFields = [
    {
      label: 'Type of Destination',
      name: 'destinationType',
      type: 'text',
      value: preferences.destinationType,
      placeholder: 'Enter destination type',
    },
    {
      label: 'Budget ($)',
      name: 'budget',
      type: 'number',
      value: preferences.budget,
      placeholder: 'Enter budget',
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {formFields.map((field) => (
        <div key={field.name} className="space-y-2">
          <Label
            htmlFor={field.name}
            className="font-baskerville text-md font-medium text-gray-700"
          >
            {field.label}
          </Label>
          <Input
            type={field.type}
            name={field.name}
            id={field.name}
            value={String(field.value)}
            onChange={handleChange}
            placeholder={field.placeholder}
            className="w-full border-gray-300 shadow-sm focus:ring focus:ring-opacity-50"
          />
        </div>
      ))}
      <div className="space-y-2">
        <Label
          htmlFor="climate"
          className="font-baskerville text-sm font-medium text-gray-700"
        >
          Preferred Climate
        </Label>
        <Select
          name="climate"
          value={preferences.climate}
          onValueChange={(value) =>
            setPreferences((prev) => ({ ...prev, climate: value }))
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Climate" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="warm">Warm</SelectItem>
            <SelectItem value="cold">Cold</SelectItem>
            <SelectItem value="temperate">Temperate</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label
          htmlFor="activities"
          className="text-sm font-medium text-gray-700"
        >
          Preferred activities (separated by commas)
        </Label>
        <Input
          type="text"
          name="activities"
          value={preferences.activities}
          onChange={(e) =>
            setPreferences({
              ...preferences,
              activities: e.target.value,
            })
          }
          placeholder="e.g., hiking, museums, beach"
          className="w-full  border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <Button
        type="submit"
        className="font-courier-prime w-full focus:outline-none focus:ring-2 focus:ring-offset-2"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating Recommendations...
          </>
        ) : (
          'Generate Travel Recommendations'
        )}
      </Button>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4  bg-red-50 p-4"
        >
          <p className="font-courier-prime text-sm text-red-700">{error}</p>
        </motion.div>
      )}
    </form>
  );
};

export default UserPreferencesForm;
