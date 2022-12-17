import * as yup from 'yup'
import dayjs from 'dayjs/esm'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { cnpj, cpf } from 'cpf-cnpj-validator'

dayjs.extend(customParseFormat)

const CPF_ID = 2

export function useRegistration() {

  const collaboratorForm = yup.object({
    name: yup.string().required('Campo obrigatório').min(3, 'Digite no mínimo 3 caracteres'),
    birth: yup.string().required('Campo obrigatório')
      .test('invalidDate', 'Data inválida.', function (value) {
        if (!value) {
          return true
        }
        return dayjs(value, 'DD/MM/YYYY').format('DD/MM/YYYY') === value
      }),
    gender: yup.object().required('Campo obrigatório'),
    maritalStatus: yup.object().required('Campo obrigatório'),
    ethnicity: yup.object().required('Campo obrigatório'),
    nationality: yup.string().required('Campo obrigatório'),
    naturalness: yup.string().required('Campo obrigatório'),
    schoolingType: yup.object().required('Campo obrigatório'),
    nameMother: yup.string().required('Campo obrigatório').min(3, 'Digite no mínimo 3 caracteres'),
    nameFather: yup.string().min(3, 'Digite no mínimo 3 caracteres'),
    document: yup.array().of(
      yup.object().shape({
        type: yup.object().required('Campo obrigatório'),
        number: yup.string().required('Campo obrigatório')
          .test('cpf-validation', 'Digite um número de CPF válido',
            (value, ref) => {
              const { type } = ref.parent
              if (value && type && type.id == CPF_ID) {
                return cpf.isValid(value)
              }
              return true
            }
          ),
        expeditionDate: yup.string().test('invalidDate', 'Data inválida.', function (value) {
          if (!value) {
            return true
          }
          return dayjs(value, 'DD/MM/YYYY').format('DD/MM/YYYY') === value
        }),
        expeditionUf: yup.string().min(2, 'Digite no mínimo 2 caracteres'),
        expeditionAgency: yup.string().min(2, 'Digite no mínimo 2 caracteres'),
      })
    ).strict(),
    contact: yup.array().of(
      yup.object().shape({
        type: yup.object().required('Campo obrigatório'),
        phoneNumber: yup.string().required('Campo obrigatório').min(14, 'Número de telefone inválido.').max(15, 'Número de telefone inválido.'),
      })
    ).strict(),
    address: yup.object().shape({
      zipCode: yup.string().required('Campo obrigatório').length(9, 'CEP inválido.')
      .test(
        'cep-validation', 'Digite CEP válido',
        (value, ref) => {
          const { place } = ref.parent
          if (value && !place) {
            return false
          }
          return true
        }
      ),
      number: yup.string().required('Campo obrigatório'),
      place: yup.string(),
      complement: yup.string().min(3, 'Digite um complemento mais específico'),
      district: yup.string(),
      state: yup.string(),
      city: yup.string(),
    }),
    dependent: yup.array().of(
      yup.object().shape({
        type: yup.object().required('Campo obrigatório'),
        name: yup.string().required('Campo obrigatório').min(3, 'Digite no mínimo 3 caracteres.'),
        birthDate: yup.string().required('Campo obrigatório').test('invalidDate', 'Data inválida.', function (value) {
          if (!value) {
            return true
          }
          return dayjs(value, 'DD/MM/YYYY').format('DD/MM/YYYY') === value
        }),
      })
    ).strict(),
  })

  return {
    collaboratorForm
  }
}