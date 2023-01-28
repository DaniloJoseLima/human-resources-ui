import * as yup from 'yup'
import dayjs from 'dayjs/esm'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { cnpj, cpf } from 'cpf-cnpj-validator'

dayjs.extend(customParseFormat)

const CPF_ID = 2
const CNPJ_ID = 6

export function useRegistration() {

  const personalDataForm = yup.object({
    name: yup.string().required('Campo obrigatório').min(3, 'Digite no mínimo 3 caracteres'),
    birthDate: yup.string().required('Campo obrigatório')
      .test('invalidDate', 'Data inválida.', function (value) {
        if (!value) {
          return true
        }
        return dayjs(value, 'DD/MM/YYYY').format('DD/MM/YYYY') === value
      }),
    email: yup.string().required('Campo obrigatório').email('E-mail inválido'),
    gender: yup.object().required('Campo obrigatório'),
    maritalStatus: yup.object().required('Campo obrigatório'),
    ethnicity: yup.object().required('Campo obrigatório'),
    nationality: yup.string().required('Campo obrigatório'),
    naturalness: yup.string().required('Campo obrigatório'),
    motherName: yup.string().required('Campo obrigatório').min(3, 'Digite no mínimo 3 caracteres'),
    fatherName: yup.string().min(3, 'Digite no mínimo 3 caracteres'),
  })

  const documentsForm = yup.object({
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
          )
          .test('cnpj-validation', 'Digite um número de CNPJ válido',
            (value, ref) => {
              const { type } = ref.parent
              if (value && type && type.id == CNPJ_ID) {
                return cnpj.isValid(value)
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
  })

  const contactsForm = yup.object({
    contact: yup.array().of(
      yup.object().shape({
        type: yup.object().required('Campo obrigatório'),
        phoneNumber: yup.string().required('Campo obrigatório').min(14, 'Número de telefone inválido.').max(15, 'Número de telefone inválido.'),
      })
    ).strict()
  })

  const addressesForm = yup.object({
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
    })
  })

  const dependentForm = yup.object({
    dependent: yup.array()
      .test(
        'dependent', '',
        (value) => {
          return !value ? true : false
        }
      )
      .of(yup.object().shape({
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

  const bankForm = yup.object({
    bankName: yup.string().required('Campo obrigatório'),
    bankAgency: yup.string().required('Campo obrigatório'),
    bankAccount: yup.string().required('Campo obrigatório'),
  })

  const contractForm = yup.object({
    wage: yup.string().required('Campo obrigatório').min(6, 'Digite no mínimo 5 caracteres'),
    occupation: yup.string().required('Campo obrigatório'),
    start: yup.string().required('Campo obrigatório').test('invalidDate', 'Data inválida.', function (value) {
      if (!value) {
        return true
      }
      return dayjs(value, 'DD/MM/YYYY').format('DD/MM/YYYY') === value
    }),
    workingHours: yup.string().required('Campo obrigatório'),
    comments: yup.string().min(6, 'Digite no mínimo 5 caracteres'),
  })

  const professionalDataForm = yup.object({
    schoolingType: yup.object().required('Campo obrigatório'),
  })

  const transportationVouchersForm = yup.object({
    typeTransportOneWay: yup.array().of(
      yup.object().shape({
        type: yup.object().required('Campo obrigatório'),
        company: yup.string().required('Campo obrigatório'),
        line: yup.string().required('Campo obrigatório'),
        quantity: yup.string().required('Campo obrigatório'),
        value: yup.string().required('Campo obrigatório'),
      })
    ).strict(),
    typeTransportReturn: yup.array().of(
      yup.object().shape({
        type: yup.object().required('Campo obrigatório'),
        company: yup.string().required('Campo obrigatório'),
        line: yup.string().required('Campo obrigatório'),
        quantity: yup.string().required('Campo obrigatório'),
        value: yup.string().required('Campo obrigatório'),
      })
    ).strict(),
  })

  const companyDataForm = yup.object({
    corporateName: yup.string().required('Campo obrigatório').min(3, 'Digite no mínimo 3 caracteres'),
    fantasyName: yup.string().required('Campo obrigatório').min(3, 'Digite no mínimo 3 caracteres'),
    cnpj: yup.string().required('Campo obrigatório').test('cnpj-validation', 'Digite um número de CNPJ válido',
      (value) => {
        if (value) {
          return cnpj.isValid(value)
        }
        return true
      }
    ),
    stateRegistration: yup.string().required('Campo obrigatório').min(3, 'Digite no mínimo 3 caracteres'),
    municipalRegistration: yup.string().required('Campo obrigatório').min(3, 'Digite no mínimo 3 caracteres'),
    mainActivity: yup.string().required('Campo obrigatório').min(3, 'Digite no mínimo 3 caracteres'),
    secondaryActivity: yup.string().required('Campo obrigatório').min(3, 'Digite no mínimo 3 caracteres'),
  })

  return {
    personalDataForm,
    documentsForm,
    contactsForm,
    addressesForm,
    dependentForm,
    bankForm,
    contractForm,
    professionalDataForm,
    transportationVouchersForm,
    companyDataForm
  }
}