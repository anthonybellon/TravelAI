'use client';

import type { NextPage } from 'next';
import { useState } from 'react';
import UserPreferencesForm from '@components/UserPreferencesForm';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { TypeAnimation } from 'react-type-animation';
import { Separator } from '@components/ui/separator';

const HomePage: NextPage = () => {
  const [recommendations, setRecommendations] = useState<string | null>(null);

  return (
    <div className="bg-paper min-h-screen bg-[#f1e8d7]">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="font-baskerville mb-4 text-center text-6xl font-bold tracking-wider text-[#3a2e21]">
          VINTAGE TRAVELER PLANNER
        </h1>

        <Separator className="mb-12 bg-[#a08c6c]" />
        <div className="grid gap-12 lg:grid-cols-2">
          <Card className="border-2 border-[#a08c6c] bg-[#fff9e6] shadow-lg transition-transform ">
            <CardHeader className="border-b-2 border-[#a08c6c] bg-[#e6d9c0]">
              <CardTitle className="font-baskerville text-3xl font-bold text-[#3a2e21]">
                Your Travel Desires
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-8">
              <UserPreferencesForm setRecommendations={setRecommendations} />
            </CardContent>
          </Card>
          <Card className="border-2 border-[#a08c6c] bg-[#fff9e6] shadow-lg transition-transform hover:scale-105">
            <CardHeader className="border-b-2 border-[#a08c6c] bg-[#e6d9c0]">
              <CardTitle className="font-baskerville text-3xl font-bold text-[#3a2e21]">
                Your Next Great Expedition
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-8">
              {recommendations ? (
                <p className="font-courier-prime leading-relaxed text-[#3a2e21]">
                  {recommendations}
                </p>
              ) : (
                <TypeAnimation
                  sequence={[
                    'Step right up, folks!',
                    1000,
                    'Embark on a grand adventure!',
                    1000,
                    'See the wonders of the world!',
                    1000,
                  ]}
                  wrapper="p"
                  speed={5}
                  style={{ fontSize: '1.4em' }}
                  repeat={Infinity}
                  className="font-courier-prime italic text-[#3a2e21]"
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
