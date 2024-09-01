import { generateTravelRecommendations } from '@utils/travelPlanGenerator';
import { sanitizeInput } from '@utils/ai';
import { TravelPreferences } from 'src/types';

export async function POST(req: Request) {
  try {
    const { userPreferences } = await req.json();
    const sanitizedPreferences = sanitizeInput(userPreferences);
    const recommendations = await generateTravelRecommendations(
      sanitizedPreferences as unknown as TravelPreferences,
    );

    return new Response(JSON.stringify({ recommendations }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e: unknown) {
    console.error('Error processing request:', e);
    if (e instanceof Error) {
      return new Response(JSON.stringify({ error: e.message }), {
        status: 'status' in e && typeof e.status === 'number' ? e.status : 500,
      });
    } else {
      return new Response(
        JSON.stringify({ error: 'An unknown error occurred' }),
        {
          status: 500,
        },
      );
    }
  }
}
