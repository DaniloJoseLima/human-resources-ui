import dayjs from 'dayjs/esm'

export function useUtils() {
  function formatDate(date, format = 'DD/MM/YYYY - HH:mm:ss') {
    return dayjs(date).format(format)
  }

  return {
    formatDate
  }
}