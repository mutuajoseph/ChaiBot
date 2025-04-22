// API Configuration

// Get environment variables with fallbacks
const getEnvVariable = (key: string): string => {
  // Check if import.meta.env is available (Vite environment)
  try {
    // @ts-ignore - Ignore TypeScript error for import.meta.env
    const env = import.meta.env;
    if (env && env[key]) {
      return env[key];
    }
    console.warn(`Environment variable ${key} not found. Please check your .env file.`);
    return '';
  } catch (e) {
    console.warn(`Error accessing environment variables: ${e}`);
    return '';
  }
};

// ChaiBot API endpoint - read from environment variable
export const API_ENDPOINT = getEnvVariable('VITE_CHAIBOT_API_ENDPOINT');

// Default API key - read from environment variable
export const DEFAULT_API_KEY = getEnvVariable('VITE_CHAIBOT_API_KEY');

// Local storage key for saving the API key
export const API_KEY_STORAGE_KEY = 'chaibot_api_key';
