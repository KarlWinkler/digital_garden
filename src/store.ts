import { reactive } from 'vue'
import { type User } from '@/types'

type Store = {
  user: User | null
}

export const store = reactive<Store>({
  user: null,
})
