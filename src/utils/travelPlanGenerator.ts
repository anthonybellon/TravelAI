import { PromptTemplate } from '@langchain/core/prompts';
import { ChatOpenAI } from '@langchain/openai';
import { HttpResponseOutputParser } from 'langchain/output_parsers';
import { RunnableSequence } from '@langchain/core/runnables';
import { TRAVEL_PLAN_TEMPLATE } from './travelPlanTemplate';
import { z } from 'zod';
import { TravelPreferences } from '../types';

const travelPreferencesSchema = z.object({
  destinationType: z.string(),
  budget: z.number(),
  activities: z.array(z.string()),
  climate: z.string(),
});

export const generateTravelRecommendations = async (
  userPreferences: TravelPreferences,
) => {
  try {
    travelPreferencesSchema.parse(userPreferences);

    const travelPlanPrompt = new PromptTemplate({
      template: TRAVEL_PLAN_TEMPLATE,
      inputVariables: ['destinationType', 'budget', 'activities', 'climate'],
    });

    const model = new ChatOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      model: 'gpt-4o-mini',
      temperature: 0.7,
      streaming: false,
      verbose: true,
    });

    const parser = new HttpResponseOutputParser();

    const chain = RunnableSequence.from([
      (input: { preferences: TravelPreferences }) => {
        return {
          destinationType: input.preferences.destinationType,
          budget: input.preferences.budget,
          activities: Array.isArray(input.preferences.activities)
            ? input.preferences.activities.join(', ')
            : input.preferences.activities,
          climate: input.preferences.climate,
        };
      },
      travelPlanPrompt,
      model,
      parser,
    ]);

    const response = await chain.invoke({ preferences: userPreferences });
    const responseText = new TextDecoder().decode(response).trim();
    const parsedResponse = JSON.parse(responseText);

    return parsedResponse.recommendations;
  } catch (error) {
    console.error('Error generating travel recommendations:', error);
    return { error: (error as unknown as Error).message };
  }
};
