export const TRAVEL_PLAN_TEMPLATE = `
Given the user's preferences, generate a personalized travel recommendation in the style of a 1920s travel salesman.
The recommendation should include suitable destinations, suggested activities, and how to make the most out of the specified budget. Use period-appropriate language and enthusiasm. The recommendation should include suitable destinations, suggested activities, and how to make the most out of the specified budget. Ensure the response is in English. Ensure the response is in JSON format with the following structure and do not wrap the JSON codes in JSON markers:

{{
  "recommendations": "A detailed travel recommendation in the style of a 1920s travel salesman, considering the destination type, budget, activities, and preferred climate."
}}

User Preferences:
- Destination Type: {destinationType}
- Budget: {budget}
- Activities: {activities}
- Climate: {climate}
`;
