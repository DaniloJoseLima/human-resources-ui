import dayjs from 'dayjs/esm'
import { mask } from 'maska'

export function useUtils() {
  function formatDate(date, format = 'DD/MM/YYYY - HH:mm:ss') {
    return dayjs(date).format(format)
  }

  function formatPrice(value) {
    return value.toString().length < 4 ? mask(value.toString(), 'R$ #,##') :
      value.toString().length == 4 ? mask(value.toString(), 'R$ ##,##') :
      value.toString().length == 5 ? mask(value.toString(), 'R$ ###,##') :
      value.toString().length == 6 ? mask(value.toString(), 'R$ #.###,##') :
      value.toString().length == 7 ? mask(value.toString(), 'R$ ##.###,##' ) :
      value.toString().length == 8 ? mask(value.toString(), 'R$ ###.###,##' ) :
      value.toString().length == 9 ? mask(value.toString(), 'R$ #.###.###,##' ) :
      value.toString().length >= 10 ? mask(value.toString(), 'R$ #.###.###,##' ) : ''
}

  return {
    formatDate,
    formatPrice
  }
}