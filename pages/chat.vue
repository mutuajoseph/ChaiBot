<template>
  <div class="min-h-screen flex flex-col bg-[#F8F9FA]">
    <!-- Top Header -->
    <header class="bg-white border-b border-gray-200 shadow-sm">
      <div class="flex justify-between items-center h-16 px-4 max-w-7xl mx-auto">
        <div class="flex-shrink-0 flex items-center">
          <img
            src="/images/chaibot-logo.svg"
            alt="ChaiBot"
            class="h-8"
          />
          <span class="ml-2 font-medium text-[#4CAF50]">ChaiBot</span>
        </div>

        <!-- Profile Section -->
        <div class="flex items-center space-x-4">
          <div class="flex items-center space-x-3">
            <div
              class="w-8 h-8 rounded-full bg-[#4CAF50] flex items-center justify-center text-white"
            >
              {{ authStore.userName ? authStore.userName.charAt(0).toUpperCase() : 'T' }}
            </div>
            <span class="text-sm text-gray-600">{{ authStore.user?.phone }}</span>
          </div>
          <button
            @click="handleLogout"
            class="text-sm text-gray-600 hover:text-gray-900 flex items-center space-x-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>

    <div class="flex flex-1">
      <!-- Main Chat Area -->
      <div class="flex-1 flex flex-col relative">
        <!-- Header with Title and Description -->
        <div
          v-if="messages.length === 0"
          class="flex-1 flex items-center justify-center"
        >
          <div class="flex flex-col items-center space-y-6 max-w-4xl w-full px-4">
            <h1 class="text-3xl font-semibold text-[#4CAF50] mt-48">ChaiBot</h1>
            <div class="flex items-center space-x-2">
              <span class="text-gray-700 font-medium">Your Tea Farming Assistant</span>
            </div>
            <p class="text-gray-600 text-center max-w-xl px-4 text-sm">
              A virtual assistant designed specifically to help tea farmers with practical, accurate, and localized advice 
              on cultivation, pest control, fertilizer recommendations, irrigation, harvesting, and sustainable farming practices.
            </p>

            <!-- Example Questions (Horizontal) -->
            <div class="flex flex-wrap justify-center gap-3 mt-8 px-4">
              <button
                @click="sendMessage('How do I control common pests affecting tea plants?')"
                class="w-[180px] p-2.5 rounded-lg border border-[#4CAF50]/30 text-left text-xs hover:bg-[#4CAF50]/10 transition-colors"
              >
                How do I control common pests affecting tea plants?
              </button>
              <button
                @click="sendMessage('What are the best fertilizer practices for tea cultivation?')"
                class="w-[180px] p-2.5 rounded-lg border border-[#4CAF50]/30 text-left text-xs hover:bg-[#4CAF50]/10 transition-colors"
              >
                What are the best fertilizer practices for tea cultivation?
              </button>
              <button
                @click="sendMessage('When is the optimal time to harvest tea leaves?')"
                class="w-[180px] p-2.5 rounded-lg border border-[#4CAF50]/30 text-left text-xs hover:bg-[#4CAF50]/10 transition-colors"
              >
                When is the optimal time to harvest tea leaves?
              </button>
              <button
                @click="sendMessage('How can I improve the quality of my tea crop?')"
                class="w-[180px] p-2.5 rounded-lg border border-[#4CAF50]/30 text-left text-xs hover:bg-[#4CAF50]/10 transition-colors"
              >
                How can I improve the quality of my tea crop?
              </button>
            </div>
            
            <!-- Disclaimer -->
            <div class="mt-8 text-xs text-gray-500 max-w-xl text-center border-t border-gray-200 pt-4">
              ChaiBot uses a curated knowledge base to provide advice. If your question cannot be answered from our database, 
              we'll let you know and suggest consulting a local agricultural officer.
            </div>
          </div>
        </div>

        <!-- Messages Area -->
        <div
          class="flex-1 overflow-y-auto p-4 pb-24"
          :class="{ 'pt-4': messages.length > 0 }"
        >
          <div class="max-w-3xl mx-auto space-y-4">
            <div
              v-for="message in messages"
              :key="message.id"
              class="flex items-start space-x-3 mb-4"
            >
              <div v-if="message.role === 'assistant'" class="flex-shrink-0">
                <div
                  class="w-8 h-8 rounded-full bg-[#4CAF50] flex items-center justify-center overflow-hidden"
                >
                  <img src="/images/chaibot-logo.svg" alt="ChaiBot" class="w-6 h-6" />
                </div>
              </div>
              <div v-else class="flex-shrink-0">
                <div
                  class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700"
                >
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0 18c4.411 0 8-3.589 8-8s-3.589-8-8-8-8 3.589-8 8 3.589 8 8 8zm-3-10c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm6 0c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-3 5.5c2.481 0 4.5-1.119 4.5-2.5h-9c0 1.381 2.019 2.5 4.5 2.5z" />
                  </svg>
                </div>
              </div>
              <div class="flex-1">
                <div
                  class="inline-block px-4 py-2 rounded-lg"
                  :class="message.role === 'assistant' ? 'bg-white border border-gray-200 shadow-sm' : 'bg-gray-100 font-bold'"
                >
                  <!-- Rendered markdown with typewriter effect for assistant messages -->
                  <p v-if="message.role === 'user'" class="text-gray-700 font-bold" v-html="message.content"></p>
                  <p v-else class="text-gray-700 typewriter-text" v-html="message.isTyping ? typingContent : message.content"></p>
                </div>
              </div>
            </div>
            <!-- Loader with ChaiBot logo animation (visible only when loading is true) -->
            <div v-if="loading" class="flex items-start space-x-3 mb-4">
              <div class="flex-shrink-0">
                <div
                  class="w-8 h-8 rounded-full bg-[#4CAF50] flex items-center justify-center overflow-hidden animate-pulse"
                >
                  <img src="/images/chaibot-logo.svg" alt="ChaiBot" class="w-6 h-6 animate-spin" />
                </div>
              </div>
              <div class="flex-1">
                <div class="inline-block px-4 py-2 rounded-lg bg-white border border-gray-200 shadow-sm">
                  <p class="text-gray-500">Thinking...</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Message Input -->
        <div class="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-sm">
          <div class="max-w-3xl mx-auto">
            <form @submit.prevent="sendMessage(newMessage)" class="flex space-x-2">
              <input
                v-model="newMessage"
                type="text"
                class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#4CAF50] focus:ring-1 focus:ring-[#4CAF50]"
                placeholder="Ask about tea farming..."
              />
              <button type="submit" class="p-2 text-white bg-[#4CAF50] rounded-lg hover:bg-[#3e8e41] transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";
import axios from "axios";
import MarkdownIt from "markdown-it";
import { API_ENDPOINT, DEFAULT_API_KEY, API_KEY_STORAGE_KEY } from "../utils/api";

interface Message {
  id: number;
  role: string;
  content: string;
  isTyping?: boolean;
}

const authStore = useAuthStore();
const router = useRouter();
const messages = ref<Message[]>([]);
const newMessage = ref("");
const loading = ref(false);
const typingContent = ref("");
const typingSpeed = 30; // milliseconds per character

// API key from config
const API_KEY = ref(DEFAULT_API_KEY);

// Function to set the API key
const setApiKey = (key: string) => {
  API_KEY.value = key;
  // Store in localStorage for persistence
  window.localStorage.setItem(API_KEY_STORAGE_KEY, key);
};

// Check if a custom API key is stored
const storedApiKey = window.localStorage.getItem(API_KEY_STORAGE_KEY);
if (storedApiKey) {
  API_KEY.value = storedApiKey;
} else {
  // Store the default key in localStorage for future sessions
  window.localStorage.setItem(API_KEY_STORAGE_KEY, API_KEY.value);
}

// Initialize markdown parser
const md = new MarkdownIt({
  html: false,
  breaks: true,
  linkify: true,
});

// Customize markdown rendering
md.renderer.rules.paragraph_open = function (tokens, idx, options, env, self) {
  return '<p class="mb-2">';
};
md.renderer.rules.bullet_list_open = function (tokens, idx, options, env, self) {
  return '<ul class="list-disc pl-5 mb-2">';
};
md.renderer.rules.ordered_list_open = function (tokens, idx, options, env, self) {
  return '<ol class="list-decimal pl-5 mb-2">';
};

// Function to simulate typewriter effect
const typewriterEffect = async (text: string, message: Message) => {
  // Set the message as typing
  message.isTyping = true;
  
  // Clear the typing content
  typingContent.value = "";
  
  // Instead of trying to parse HTML, we'll type out the HTML directly
  // This ensures all characters including citations are properly displayed
  const totalLength = text.length;
  const chunkSize = 3; // Process multiple characters at once for better performance
  
  // Type chunks of characters with a delay
  for (let i = 0; i < totalLength; i += chunkSize) {
    const end = Math.min(i + chunkSize, totalLength);
    typingContent.value = text.substring(0, end);
    await new Promise(resolve => setTimeout(resolve, typingSpeed));
  }
  
  // Ensure the final content is complete
  typingContent.value = text;
  
  // Wait a moment before finalizing to ensure rendering is complete
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // Set the final content and mark as not typing
  message.content = text;
  message.isTyping = false;
  
  // Force a DOM update to ensure the last word is displayed
  await nextTick();
};

const handleLogout = () => {
  authStore.logout();
  router.push("/login");
};

const sendMessage = async (message: string) => {
  if (!message.trim() && typeof message !== "string") return;
  
  // Check if API key is set
  if (!API_KEY.value && message !== "set_api_key") {
    // If message starts with "api_key:" then set the API key
    if (message.toLowerCase().startsWith("api_key:")) {
      const key = message.substring(8).trim();
      setApiKey(key);
      const botMessage: Message = {
        id: Date.now(),
        role: "assistant",
        content: md.render("API key has been set. You can now start chatting with ChaiBot."),
        isTyping: false
      };
      messages.value.push(botMessage);
      return;
    }
    
    // Prompt user to set API key
    const botMessage: Message = {
      id: Date.now(),
      role: "assistant",
      content: md.render("Please set your API key by typing 'api_key: YOUR_API_KEY'"),
      isTyping: false
    };
    messages.value.push(botMessage);
    return;
  }
  
  // Clear input field if it's a user-typed message
  if (message === newMessage.value) {
    newMessage.value = "";
  }

  // Add user message
  const userMessage: Message = {
    id: Date.now(),
    role: "user",
    content: message,
    isTyping: false
  };
  messages.value.push(userMessage);

  // Set loading state
  loading.value = true;

  try {
    // Format messages history for the API
    const messageHistory = messages.value.map(msg => ({
      role: msg.role,
      content: msg.role === 'user' ? msg.content : msg.content.replace(/<[^>]*>/g, '') // Strip HTML from assistant messages
    }));

    // Call the API with the correct format and include the access key in headers
    const response = await axios.post(API_ENDPOINT, {
      messages: messageHistory,
      temperature: 0.7,
      max_tokens: 1000,
      stream: false,
      provide_citations: true
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY.value}`,
        'Content-Type': 'application/json'
      }
    });
    
    // Extract the response content from the API response
    let responseContent = "I'm having trouble understanding. Please try again.";
    if (response.data && response.data.choices && response.data.choices.length > 0) {
      const choice = response.data.choices[0];
      if (choice.delta && choice.delta.content) {
        responseContent = choice.delta.content;
      } else if (choice.message && choice.message.content) {
        responseContent = choice.message.content;
      }
    }

    // Format the response with markdown
    const formattedResponse = md.render(responseContent);
    
    // Add bot response with empty content initially
    const botMessage: Message = {
      id: Date.now(),
      role: "assistant",
      content: "",
      isTyping: true
    };
    messages.value.push(botMessage);
    
    // Hide the loading indicator
    loading.value = false;
    
    // Apply typewriter effect after the message is added to the DOM
    await nextTick();
    try {
      await typewriterEffect(formattedResponse, botMessage);
    } catch (typingError) {
      console.error("Error during typing animation:", typingError);
      // Fallback: just show the full response if animation fails
      botMessage.content = formattedResponse;
      botMessage.isTyping = false;
    }
    
  } catch (error) {
    console.error("Error sending message:", error);
    // Add error message
    const errorMessage: Message = {
      id: Date.now(),
      role: "assistant",
      content: md.render("I'm having trouble connecting to the knowledge base right now. Please try again later."),
      isTyping: false
    };
    messages.value.push(errorMessage);
    loading.value = false;
  }
};
</script>

<style>
/* Scrollbar Styles */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}

/* ChatGPT-style loading animation */
.chatgpt-loader .dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #4CAF50;
  opacity: 0.6;
  animation: chatgpt-loader-bounce 1.4s infinite ease-in-out both;
}

.chatgpt-loader .dot:nth-child(1) {
  animation-delay: -0.32s;
}

.chatgpt-loader .dot:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes chatgpt-loader-bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

/* Typewriter cursor effect */
.typewriter-text {
  position: relative;
  word-break: break-word;
}

.typewriter-text::after {
  content: '|';
  position: absolute;
  display: inline-block;
  margin-left: 2px;
  animation: cursor-blink 0.7s infinite;
}

@keyframes cursor-blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

/* User message styling */
.font-bold {
  font-weight: 700;
}

/* Animation classes */
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-spin {
  animation: spin 2s linear infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
