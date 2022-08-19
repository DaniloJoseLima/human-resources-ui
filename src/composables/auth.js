import * as yup from 'yup'

export function useLogin() {

  const loginForm = yup.object({
    email: yup.string().required('Campo obrigatório').email('E-mail inválido'),
    password: yup.string().required('Campo obrigatório')
  })

  return {
    loginForm
  }
}