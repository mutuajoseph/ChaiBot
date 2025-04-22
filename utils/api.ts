// API Configuration

// ChaiBot API endpoint - read from environment variable or use fallback
export const API_ENDPOINT = import.meta.env.VITE_CHAIBOT_API_ENDPOINT || "https://g3bz7mnxnlormocz4c37njew.agents.do-ai.run/api/v1/chat/completions";

// Default API key - read from environment variable or use fallback
export const DEFAULT_API_KEY = import.meta.env.VITE_CHAIBOT_API_KEY || "gardaaTqYuzRTQ3kNHiLh4DsrO2lY-TB";

// Local storage key for saving the API key
export const API_KEY_STORAGE_KEY = 'chaibot_api_key';
