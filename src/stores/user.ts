import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { registerUser, loginUser, logOutUser } from '../helpers/firebase'
import type { UserData } from '@/types/types'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: {
        ifLogged: false as boolean,
        userName: '' as string
      }
    }
  },
  actions: {
    async registerUser(userData: UserData) {
      const { email, password } = userData
      const res = await registerUser(email, password)
      try {
        this.user.ifLogged = true
      } catch (error: any) {
        const errorCode = error.code
        const errorMessage = error.message
      }
    },
    async loginUser(userData: UserData) {
      const { email, password } = userData
      await loginUser(email, password)
      this.user.ifLogged = true
    },
    async LogoutUser() {
      await logOutUser()
    }
  }
})
