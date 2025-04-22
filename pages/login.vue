<template>
  <div class="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#F8F9FA]">
    <!-- Logo -->
    <div class="mb-8">
      <img src="/images/chaibot-logo.svg" alt="ChaiBot" class="h-16 mx-auto" />
    </div>

    <!-- Title -->
    <h1 class="text-3xl font-semibold text-[#4CAF50] mb-4">Welcome to ChaiBot</h1>

    <p class="text-sm font-medium text-center text-gray-600 mb-8">Your virtual assistant for tea farming <br/> with practical and localized advice.</p>

    <!-- Form -->
    <form @submit.prevent="handleSubmit" class="w-full max-w-md">
      <Transition name="fade" mode="out-in">
        <!-- Phone Number Step -->
        <div v-if="currentStep === 1" key="phone" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Phone Number<span class="text-[#4CAF50]">*</span>
            </label>
            <input
              v-model="phoneNumber"
              type="tel"
              required
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#4CAF50] focus:border-[#4CAF50] outline-none transition-colors bg-white"
              placeholder="Enter your phone number"
              @keyup.enter="handleContinue"
            >
          </div>

          <button
            type="button"
            @click="handleContinue"
            class="w-full py-3 px-4 rounded-lg text-white font-medium transition-colors bg-[#4CAF50] hover:bg-[#3e8e41]"
          >
            Continue
          </button>

          <p class="text-center text-sm text-gray-600">
            Don't have an account? <NuxtLink to="/register" class="text-[#4CAF50] hover:text-[#3e8e41]">Sign up</NuxtLink>
          </p>
        </div>

        <!-- Password Step -->
        <div v-else key="password" class="space-y-6">
          <div class="flex items-center mb-4">
            <button
              type="button"
              @click="handleBack"
              class="text-gray-500 hover:text-[#4CAF50] transition-colors"
            >
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span class="ml-2 text-gray-500">{{ phoneNumber }}</span>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Password<span class="text-[#4CAF50]">*</span>
            </label>
            <div class="relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#4CAF50] focus:border-[#4CAF50] outline-none transition-colors bg-white"
                placeholder="Enter your password"
                @keyup.enter="handleSubmit"
              >
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg
                  class="h-5 w-5 text-gray-400"
                  :class="{ 'text-[#4CAF50]': showPassword }"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    v-if="showPassword"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    v-if="showPassword"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                  <path
                    v-else
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              </button>
            </div>
          </div>

          <button
            type="submit"
            class="w-full py-3 px-4 rounded-lg text-white font-medium transition-colors bg-[#4CAF50] hover:bg-[#3e8e41]"
          >
            {{ loading ? 'Please wait...' : 'Login' }}
          </button>
        </div>
      </Transition>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const phoneNumber = ref('')
const password = ref('')
const loading = ref(false)
const currentStep = ref(1) // 1 or 2
const showPassword = ref(false)

const isPhoneValid = computed(() => {
  if (!phoneNumber.value) return false
  // Basic phone validation - can be enhanced based on your requirements
  return phoneNumber.value.length >= 10
})

const canContinue = computed(() => {
  if (currentStep.value === 1) {
    return isPhoneValid.value
  }
  return password.value.length >= 6
})

const handleContinue = () => {
  if (phoneNumber.value) {
    currentStep.value++
  }
}

const handleBack = () => {
  currentStep.value = 1
  password.value = ''
  showPassword.value = false
}

const handleSubmit = async () => {
  if (!phoneNumber.value || !password.value) return
  loading.value = true
  try {
    await authStore.login({
      phone: phoneNumber.value,
      password: password.value
    })
    router.push('/chat')
  } catch (error) {
    console.error('Login failed:', error)
    // Handle login error
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
