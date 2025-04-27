<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { API_URL } from '@/environment'
import { store } from '@/store'
import { getCookie } from '@/helpers'

const email = ref<string>('')
const password = ref<string>('')
const error = ref<string>('')

const router = useRouter()

const session = getCookie('refreshToken')
const csrfToken = getCookie('csrftoken')
if (session && csrfToken) {
  fetch(`${API_URL}/api/user/self`, {
    headers: {
      'X-CSRFToken': csrfToken,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(res)
      }
    })
    .then((data) => {
      store.user = data
      router.push({ path: '/' })
    })
    .catch((res) => {
      error.value = res.message
    })
}

const submitLogin = async () => {
  const response = await fetch(`${API_URL}/api/user/auth/login`, {
    method: 'POST',
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
    headers: {
      'Content-type': 'application/json',
    },
  })

  if (response.ok) {
    const data = await response.json()
    store.user = data
    document.cookie = 'refreshToken=True;path=/;'
    // router.push({ path: '/' })
  } else if (response.status == 401) {
    const data = await response.json()
    error.value = data.message
  }
}
</script>

<template>
  <div class="form login-form">
    <div class="error">{{ error }}</div>
    <div class="form-input">
      <label for="email">Email: </label>
      <input type="text" v-model="email" name="email" />
    </div>
    <div class="form-input">
      <label for="Password">Password: </label>
      <input type="password" v-model="password" name="password" />
    </div>
    <button @click="submitLogin">submit</button>
  </div>
</template>
