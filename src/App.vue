<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { store } from '@/store'
import { API_URL } from './environment'
import { getCookie } from './helpers'

const csrfToken = getCookie('csrftoken')
const session = getCookie('refreshToken')
console.log(session, csrfToken)
if (session && csrfToken) {
  fetch(`${API_URL}/api/user/self`, {
    headers: {
      'X-CSRFToken': csrfToken,
    },
    credentials: 'include',
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
    })
    .then((data) => {
      store.user = data
    })
}

const logout = () => {
  if (csrfToken) {
    fetch(`${API_URL}/api/user/auth/logout`, {
      method: 'POST',
      headers: {
        'X-CSRFToken': csrfToken,
      },
    })
  }

  document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  store.user = null
}
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/">About</RouterLink>
      </nav>
      <div class="user-info" v-if="store.user">
        <span class="username">{{ store.user.username }}</span>
        <span class="logout" @click="logout">Logout</span>
      </div>
      <div v-else>
        <RouterLink to="/login">Login</RouterLink>
      </div>
    </div>
  </header>

  <div class="body">
    <RouterView />
  </div>

  <footer></footer>
</template>

<style scoped>
.wrapper {
  display: flex;
  width: 100%;

  justify-content: space-between;
  align-items: center;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  display: flex;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.user-info {
  padding: 4px;
}

.username {
  padding-right: 4px;
}

.logout {
  text-decoration: underline;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
