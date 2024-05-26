import * as yup from 'yup'

export function useUser() {

  const userDataForm = yup.object({
    name: yup.string().required('Campo obrigatório').min(3, 'Digite no mínimo 3 caracteres'),
    email: yup.string().required('Campo obrigatório').email('E-mail inválido'),
    roles: yup.object().required('Campo obrigatório'),
  })

  const updatePasswordForm = yup.object({
    password: yup.string().required('Campo obrigatório').min(8, 'Digite no mínimo 8 caracteres')
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
        "Sua senha deve ser composta por letras Maíuscula, Minúscula, Números, Caracteres Especiais e ter no mínimo 8 caracteres"),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'As senhas devem ser iguais').
      required('Campo obrigatório').min(8, 'Digite no mínimo 8 caracteres')
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
        "Sua senha deve ser composta por letras Maíuscula, Minúscula, Números, Caracteres Especiais e ter no mínimo 8 caracteres"),
  })
  
  return {
    userDataForm,
    updatePasswordForm
  }
}