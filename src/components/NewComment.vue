<script setup lang="ts">
import { ref, inject } from 'vue'
import { useRoute } from 'vue-router'
import { API_URL } from '@/environment'
import { getCookie } from '@/helpers'

const create = ref<boolean>(false)
const content = ref<string>('')

const route = useRoute()

const props = defineProps({
  buttonName: String,
  parentId: {
    type: Number,
    required: false,
    default: null,
  },
})

const commentRefresh = inject<() => void>('commentRefresh')

const saveComment = async () => {
  const csrfToken = getCookie('csrftoken')
  if (csrfToken) {
    const response = await fetch(`${API_URL}/api/post/${route.params.slug}/comment`, {
      method: 'POST',
      body: JSON.stringify(
        {
          content: content.value,
          parent_id: props.parentId,
        },
        (_, value) => {
          if (value !== null) return value
        },
      ),
      credentials: 'include',
      headers: {
        'X-CSRFToken': csrfToken,
      },
    })

    if (response.ok) {
      const data = await response.json()
      content.value = data.content

      if (commentRefresh) {
        commentRefresh()
      }

      content.value = ''
      create.value = false
    }
  }
}
</script>

<template>
  <div class="new-comment comment" v-if="create">
    <div class="form-input">
      <textarea v-model="content" name="email" />
    </div>
    <button @click="create = false">cancel</button>
    <button @click="saveComment">save</button>
  </div>
  <div v-else>
    <button @click="create = true">{{ buttonName }}</button>
  </div>
</template>
