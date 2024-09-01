export const sanitizeInput = (input: string | Record<string, string>) => {
    // Implement necessary sanitization logic
    if (typeof input === 'string') {
      return input.trim();
    }
    if (typeof input === 'object') {
      for (const key of Object.keys(input)) {
        if (typeof input[key] === 'string') {
          input[key] = input[key].trim();
        }
      }
    }
    return input;
  };
  