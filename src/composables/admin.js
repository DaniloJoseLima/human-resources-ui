import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import * as yup from 'yup'


export function useSearch () {
  const router = useRouter()
  const route = useRoute()
  
  const searchFormValues = computed(() => ({
    field: route.query.field || 'name',
    q: route.query.q || ''
  }))

  const searchFormValidation = yup.object({
    q: yup.string().required('Por favor, digite a informação a ser busca')

  })

  function setSearchParams (searchParams) {
    router.push({ query: { ...route.query, page: 1, ...searchParams }})
  }
  
  return {
    searchFormValues,
    searchFormValidation,
    setSearchParams,
  }
}
