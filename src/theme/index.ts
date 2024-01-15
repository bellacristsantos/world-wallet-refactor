import { extendTheme } from 'native-base';

export const THEME = extendTheme({

    colors: {
      purple: {
        500: '#865CD0'
      },
      gray: {
        700: '#121214',
        600: '#202024',
        500: '#29292E',
        400: '#323238',
        300: '#7C7C8A',
        200: '#C4C4CC',
        100: '#E1E1E6'
      },
      white: '#FFFFFF',
      red: {
        500: '#F75A68'
      },
      linearGradient: {

        colors: ['#6D50A0', '#E983F7', '#EC84F9', '#F687FF'],


        locations: [0, 0.25, 0.5, 1],


        orientation: 'horizontal',
      }
    },
    fonts: {
      heading: 'Roboto_700Bold',
      body: 'Roboto_400Regular',
    },
    fontSizes: {
      xs: 10,
      sm: 12,
      md: 14,
      lg: 16,
      xl: 20,
    },
    sizes: {
      14: 56,
      33: 148
    }

})

