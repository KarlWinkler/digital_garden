<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { API_URL } from '@/environment'
import { store } from '@/store'

import '@/assets/styles/form.css'

const username = ref<string>('')
const firstName = ref<string>('')
const lastName = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')
const error = ref<string>('')

const router = useRouter()

if (store.user) {
  router.push({ path: '/' })
}

const submitLogin = async () => {
  const response = await fetch(`${API_URL}/api/user/auth/signup`, {
    method: 'POST',
    body: JSON.stringify({
      username: username.value,
      first_name: firstName.value,
      last_name: lastName.value,
      email: email.value,
      password: password.value,
    }),
    headers: {
      'Content-type': 'application/json',
    },
    credentials: 'include',
  })

  if (response.ok) {
    const data = await response.json()
    store.user = data
    document.cookie = 'refreshToken=True;path=/;'
    router.push({ path: '/' })
  } else if (response.status == 401) {
    const data = await response.json()
    error.value = data.message
  }
}
</script>

<template>
  <div class="container">
    <h1>Sign Up</h1>
    <div class="error">{{ error }}</div>
    <div class="form login-form">
      <div class="form-input">
        <label for="username">Username*: </label>
        <input type="text" v-model="username" name="username" />
      </div>

      <div class="form-input">
        <label for="firstName">First Name: </label>
        <input type="text" v-model="firstName" name="firstName" />
      </div>

      <div class="form-input">
        <label for="lastName">Last Name: </label>
        <input type="text" v-model="lastName" name="lastName" />
      </div>

      <div class="form-input">
        <label for="email">Email*: </label>
        <input type="text" v-model="email" name="email" />
      </div>
      <div class="form-input">
        <label for="Password">Password*: </label>
        <input type="password" v-model="password" name="password" />
      </div>
    </div>
    <button @click="submitLogin">Sign Up</button>
  </div>
</template>
