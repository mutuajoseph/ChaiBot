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
              class="flex items-start space-x-3"
            >
              <div v-if="message.role === 'assistant'" class="flex-shrink-0">
                <div
                  class="w-8 h-8 rounded-full bg-[#4CAF50] flex items-center justify-center text-white"
                >
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0 18c4.411 0 8-3.589 8-8s-3.589-8-8-8-8 3.589-8 8 3.589 8 8 8zm-3-10c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm6 0c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-3 5.5c2.481 0 4.5-1.119 4.5-2.5h-9c0 1.381 2.019 2.5 4.5 2.5z" />
                  </svg>
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
                  :class="message.role === 'assistant' ? 'bg-white border border-gray-200 shadow-sm' : 'bg-gray-100'"
                >
                  <!-- Rendered markdown with spacing -->
                  <p class="text-gray-700" v-html="message.content"></p>
                </div>
              </div>
            </div>
            <!-- Loader with ChatGPT-style animation (visible only when loading is true) -->
            <div v-if="loading" class="flex items-start space-x-3">
              <div class="flex-shrink-0">
                <div
                  class="w-8 h-8 rounded-full bg-[#4CAF50] flex items-center justify-center text-white"
                >
                  <svg class="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"
                    />
                  </svg>
                </div>
              </div>
              <div class="flex-1">
                <div class="inline-block px-4 py-2 rounded-lg bg-white border border-gray-200 shadow-sm">
                  <div class="chatgpt-loader flex space-x-1">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                  </div>
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
import { ref } from "vue";
import { useAuthStore } from "~/stores/auth";
import { useRouter } from "vue-router";
import axios from "axios";
import MarkdownIt from "markdown-it";

interface Message {
  id: number;
  role: string;
  content: string;
}

const authStore = useAuthStore();
const router = useRouter();
const messages = ref<Message[]>([]);
const newMessage = ref("");
const loading = ref(false);

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

const handleLogout = () => {
  authStore.logout();
  router.push("/login");
};

const sendMessage = async (message: string) => {
  if (!message.trim() && typeof message !== "string") return;
  
  // Clear input field if it's a user-typed message
  if (message === newMessage.value) {
    newMessage.value = "";
  }

  // Add user message
  const userMessage: Message = {
    id: Date.now(),
    role: "user",
    content: message,
  };
  messages.value.push(userMessage);

  // Set loading state
  loading.value = true;

  try {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check if question is about tea farming
    const isTeaFarmingQuestion = checkIfTeaFarmingRelated(message);
    let responseContent = "";

    if (!isTeaFarmingQuestion) {
      responseContent = "ChaiBot is focused on helping tea farmers. Would you like to ask something related to tea cultivation?";
    } else {
      // Simulate response based on knowledge base
      responseContent = await generateResponse(message);
    }

    // Add bot response
    const botMessage: Message = {
      id: Date.now(),
      role: "assistant",
      content: md.render(responseContent),
    };
    messages.value.push(botMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    // Add error message
    const errorMessage: Message = {
      id: Date.now(),
      role: "assistant",
      content: md.render("I'm having trouble connecting to the knowledge base right now. Please try again later."),
    };
    messages.value.push(errorMessage);
  } finally {
    loading.value = false;
  }
};

// Function to check if question is related to tea farming
const checkIfTeaFarmingRelated = (message: string): boolean => {
  const teaKeywords = [
    "tea", "farming", "crop", "plant", "harvest", "fertilizer", "pest", "disease", 
    "irrigation", "weather", "soil", "cultivation", "leaves", "quality", "sustainable", 
    "organic", "processing", "market", "price", "yield", "variety", "seedling"
  ];
  
  const lowercaseMessage = message.toLowerCase();
  return teaKeywords.some(keyword => lowercaseMessage.includes(keyword));
};

// Function to generate response based on knowledge base
const generateResponse = async (message: string): Promise<string> => {
  // This would normally call an API with the knowledge base
  // For now, we'll simulate some responses
  
  const lowercaseMessage = message.toLowerCase();
  
  if (lowercaseMessage.includes("pest")) {
    return "**Common Tea Pests and Control Methods:**\n\n" +
      "1. **Tea Mosquito Bug**: Apply neem-based pesticides or introduce natural predators like ladybugs.\n" +
      "2. **Red Spider Mites**: Maintain proper humidity and use sulfur-based sprays when infestation is severe.\n" +
      "3. **Thrips**: Use blue sticky traps and apply recommended insecticides during early morning or late evening.\n\n" +
      "Always follow integrated pest management practices and consult your local agricultural extension office for specific recommendations for your region.";
  } 
  
  if (lowercaseMessage.includes("fertilizer")) {
    return "**Fertilizer Best Practices for Tea:**\n\n" +
      "Tea plants generally require a balanced NPK fertilizer with slightly higher nitrogen content. Apply fertilizers in 3-4 split doses throughout the year, with heavier applications before the main growing seasons.\n\n" +
      "* **Young plants**: 15:15:15 NPK ratio\n" +
      "* **Mature plants**: 25:10:10 NPK ratio\n\n" +
      "Organic options include well-decomposed compost, vermicompost, and bone meal. Always soil test before making major fertilizer decisions.";
  }
  
  if (lowercaseMessage.includes("harvest")) {
    return "**Tea Harvesting Guidelines:**\n\n" +
      "The optimal time to harvest tea leaves is when there are 2-3 new leaves and a bud at the top of the plant. This is often referred to as the 'two leaves and a bud' standard.\n\n" +
      "* **First flush**: Early spring (depending on your region)\n" +
      "* **Second flush**: Early summer\n" +
      "* **Monsoon flush**: During rainy season\n" +
      "* **Autumn flush**: After monsoon season\n\n" +
      "Harvest in the morning after dew has dried but before midday heat for best quality.";
  }
  
  if (lowercaseMessage.includes("quality")) {
    return "**Improving Tea Crop Quality:**\n\n" +
      "1. **Proper pruning**: Maintain a table height of 75-90cm and prune every 3-5 years\n" +
      "2. **Shade management**: Partial shade (40-60%) improves tea quality by increasing amino acid content\n" +
      "3. **Timely harvesting**: Pick at the right maturity - two leaves and a bud\n" +
      "4. **Post-harvest handling**: Process within 4-6 hours of plucking\n" +
      "5. **Organic practices**: Reduce chemical inputs for better flavor profiles\n\n" +
      "Quality tea leaves should have a bright appearance and feel slightly springy to touch.";
  }
  
  // Default response for other tea-related questions
  return "I'm not certain about that specific tea farming question. You might want to consult a local agricultural officer or expert for more guidance. Feel free to ask about pest control, fertilizer practices, harvesting techniques, or quality improvement methods.";
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
</style>
