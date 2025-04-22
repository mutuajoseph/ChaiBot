# ChaiBot - AI Assistant for Tea Farmers

ChaiBot is an intelligent virtual assistant designed specifically for tea farmers in Kenya. It provides expert guidance on tea farming practices, pest management, weather information, and market insights through a user-friendly chat interface.

## Features

- **Phone-based Authentication**: Simple login/registration using phone numbers for easy access by farmers
- **AI-powered Chat Interface**: Intelligent responses to farming queries with a natural typewriter effect
- **Expert Knowledge**: Access to comprehensive information about tea farming best practices
- **User-friendly Design**: Clean, intuitive interface optimized for both desktop and mobile devices
- **Secure API Integration**: Connects to the AI Agents platform for intelligent responses

## Technology Stack

- **Frontend**: Vue.js/Nuxt 3 with TypeScript
- **Styling**: Tailwind CSS for responsive design
- **State Management**: Pinia for efficient state handling
- **AI Integration**: Custom API integration with AI Agents platform
- **Authentication**: Phone number-based authentication system

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/chaibot.git
   cd chaibot
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with your API credentials:
   ```
   VITE_CHAIBOT_API_ENDPOINT="https://g3bz7mnxnlormocz4c37njew.agents.do-ai.run/api/v1/chat/completions"
   VITE_CHAIBOT_API_KEY="your-api-key-here"
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
# or
yarn build
```

## Usage Guide

1. **Registration**: New users can register with their name and phone number
2. **Login**: Returning users can log in with their phone number and password
3. **Chat Interface**: Once logged in, users can ask questions about tea farming
4. **Example Queries**:
   - "How do I control tea mosquito bugs?"
   - "What is the best fertilizer for tea plants?"
   - "When is the best time to prune tea bushes?"
   - "How can I improve tea quality during processing?"

## Project Structure

- `/pages` - Main application pages (login, register, chat)
- `/stores` - Pinia stores for state management
- `/utils` - Utility functions and API configuration
- `/components` - Reusable Vue components
- `/public` - Static assets including the ChaiBot logo

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- AI Agents platform for providing the intelligent backend
- The tea farming community in Kenya for their valuable input and feedback
