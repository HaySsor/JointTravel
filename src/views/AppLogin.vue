<template>
  <div>
    <div class="login">
      <div class="login__title-box">
        <h3>{{ isLoginLook ? 'Login' : 'Registration' }}</h3>
        <button @click="toggleLoginAndRegistration">
          {{ isLoginLook ? 'Registration' : 'Login' }}
        </button>
      </div>
      <form class="login__form" @submit.prevent="submitData">
        <div class="login__form-box">
          <label>Email</label>
          <input v-model="userData.email" type="email" required="true" />
        </div>
        <div class="login__form-box">
          <label>Password</label>
          <input v-model="userData.password" type="password" required="true" minlength="6" />
        </div>
        <button>{{ isLoginLook ? 'Login' : 'Registration' }}</button>
      </form>
    </div>
    <p v-if="error.isError" class="error">{{ error.text }}</p>
    <AppModal v-if="isModalOpen">
      <AppLoader v-if="isLoginLoading" />
    </AppModal>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '../stores/user'
import { ref, reactive } from 'vue'
import type { UserData } from '../types/types'
import { useRouter } from 'vue-router'
import AppLoader from '@/components/AppLoader.vue'
import AppModal from '@/components/AppModal.vue'

const isLoginLook = ref<boolean>(true)
const isLoginLoading = ref<boolean>(false)
const isModalOpen = ref<boolean>(false)
const store = useUserStore()
const router = useRouter()

const { registerUser, loginUser, user } = store

const error: {
  isError: boolean
  text: string
} = reactive({
  isError: false,
  text: ''
})
const userData: UserData = reactive({
  email: '',
  password: ''
})

const toggleLoginAndRegistration = () => {
  isLoginLook.value = !isLoginLook.value
}
const submitData = async () => {
  const userName = userData.email.match(/^(.*?)@/)
  isLoginLoading.value = true
  isModalOpen.value = true
  error.isError = false
  try {
    if (isLoginLook.value) {
      await loginUser(userData)
    } else {
      await registerUser(userData)
    }
    if (userName !== null) {
      user.userName = userName[1]
    }
    isModalOpen.value = false
    isLoginLoading.value = false
    router.push({ name: 'Home' })
  } catch (err) {
    error.isError = true
    error.text = 'Email or Password is incorrect'
    isModalOpen.value = false
    isLoginLoading.value = false
    userData.email = ''
    userData.password = ''
  }
}
</script>

<style lang="scss">
.login {
  margin-top: 30px;
  padding: 10px;
  &__title-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    gap: 15px;
    h3 {
      margin-left: 50px;
      font-size: 3rem;
      position: relative;
      .dark & {
        color: white;
      }
    }
    button {
      padding: 10px 15px;
      border: none;
      background-color: rgba(32, 178, 171, 0.779);
      color: white;
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.226);
      border-radius: 25px;
      font-size: 1.5rem;
      transition: transition 0.3s;
      margin-right: 10px;
      &:hover {
        background-color: rgba(19, 111, 106, 0.779);
        transform: scale(1.2);
      }
    }
  }

  &__form {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    gap: 30px;
    padding: 20px;
    background-color: rgba(32, 178, 171, 0.779);
    border-radius: 25px;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.226);

    &-box {
      display: flex;
      flex-direction: column;
      width: 100%;
      label {
        font-size: 1.7rem;
        margin-bottom: 5px;
        color: white;
      }
      input {
        padding: 5px;
        border: none;
        width: 100%;
        border-radius: 25px;
      }
    }
    button {
      align-self: flex-end;
      padding: 10px 15px;
      border: none;
      border-radius: 25px;
      background-color: white;
      font-size: 2rem;
    }
  }
}

.error {
  text-align: center;
  font-size: 1.5rem;
  color: lightcoral;
}
</style>
