<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { API_URL } from '@/environment'
import { store } from '@/store'
import { getFutureTime, getCookie } from '@/helpers'

const email = ref<string>('')
const password = ref<string>('')
const error = ref<string>('')

const router = useRouter()

const user = getCookie('user')
if (user) {
  store.user = JSON.parse(user)
  router.push({ path: '/' })
}

const submitLogin = () => {
  fetch(`${API_URL}/api/user/auth/login`, {
    method: 'POST',
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
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
      document.cookie = `user=${JSON.stringify(data)};expires=;path=/`
      router.push({ path: '/' })
    })
    .catch((res) => {
      error.value = res.message
    })
}
</script>

<template>
  <div class="form login-form">
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
