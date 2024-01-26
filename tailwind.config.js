module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['IBM Plex Sans', 'sans-serif']
    },
   
    colors: {
      primary: {
        50:  '#4fe4f9',
        100: '#3ed8ed',
        200: '#29cde1',
        300: '#00c1d5',
        400: '#00b5c9',
        500: '#00aabe',
        600: '#009fb2'
      },
      secondary: {
        100: '#FFEA00',
        200: '#FFDD00',
        300: '#FFD000',
        400: '#FFC300',
        500: '#FFB700'
      },
      neutral: {
        50: '#ECECEC',
        100: '#CCD4D9',
        200: '#9AA9B4',
        300: '#687E8C',
        400: '#43515A',
        500: '#1D2327'
      },
      negative: {
        100: '#FFCDC7',
        200: '#FE8274',
        300: '#DF4D3C',
        400: '#CC2E1C',
        500: '#7B1206'
      },
      warning: {
        100: '#FFF0D2',
        200: '#FFDC97',
        300: '#FBC253',
        400: '#E9A929',
        500: '#C18610'
      },
      positive: {
        100: '#B4FBCF',
        200: '#48DA80',
        300: '#10A549',
        400: '#01732D',
        500: '#003715'
      },
      transparent: 'transparent',
      white: '#FFFFFF',
      current: 'currentColor'
    },
    container: {
      center: true,
      padding: '1.5rem'
    },
    extend: {},
  },
  plugins: [],
}
// https://coolors.co/palette/ff7b00-ff8800-ff9500-ffa200-ffaa00-ffb700-ffc300-ffd000-ffdd00-ffea00
// https://coolors.co/palette/f94144-f3722c-f8961e-f9c74f-90be6d-43aa8b-577590
// https://colorbrewer2.org/#type=sequential&scheme=YlOrRd&n=3