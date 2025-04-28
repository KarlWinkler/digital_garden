<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { API_URL } from '@/environment'
import { store } from '@/store'

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
        <label for="username">Username: </label>
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
        <label for="email">Email: </label>
        <input type="text" v-model="email" name="email" />
      </div>
      <div class="form-input">
        <label for="Password">Password: </label>
        <input type="password" v-model="password" name="password" />
      </div>
    </div>
    <button @click="submitLogin">Sign Up</button>
  </div>
</template>

<style>
.container {
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
}

.form {
  display: grid;

  grid-template-columns: 1fr 1fr;

  width: min-content;
}

.form-input {
  display: grid;
  grid-column: 1/3;
  grid-template-columns: subgrid;

  align-items: center;

  margin: 12px;
}

label {
  margin-right: 24px;

  text-wrap: nowrap;
}

input[type='text'],
input[type='password'] {
  background-color: transparent;

  border: 1px solid black;
  border-radius: 4px;

  padding: 12px;
}

button {
  background-color: transparent;

  border: 1px solid black;
  border-radius: 4px;

  margin: 12px;

  padding: 6px 12px;

  cursor: pointer;
}

button:hover {
  background-color: #ed0bb4;
  color: white;
}
</style>
