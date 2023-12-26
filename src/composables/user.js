import * as yup from 'yup'

export function useUser() {

  const userDataForm = yup.object({
    name: yup.string().required('Campo obrigatório').min(3, 'Digite no mínimo 3 caracteres'),
    email: yup.string().required('Campo obrigatório').email('E-mail inválido'),
    roles: yup.object().required('Campo obrigatório'),
  })

  
  return {
    userDataForm
  }
}