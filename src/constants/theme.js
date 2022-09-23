export const theme = Object.freeze({
  colors: {
    primaryBg: 'rgba(85, 217, 217, 0.41)',
    secondaryBg: '#30b2f364',
    white: '#ffffff',
    black: '#010101',
    grey: 'grey',
    lightGrey: '#f3f8f9',
    middleGrey: '#e8edf3',
    green: 'rgba(37, 158, 37, 0.621)',
    red: 'rgba(165, 39, 39, 0.748)',
    purple: '#e2d6ed',
    turquoise: '#00bcd5',
  },

  space: [0, 2, 4, 8, 16, 32, 64],

  spacing: value => `${4 * value}px`,

  fonts: {
    heading: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },

  fontSizes: {
    xs: 12,
    s: 14,
    m: 16,
    l: 24,
    xl: 64,
  },

  fontWeights: {
    normal: 400,
    bold: 700,
  },

  borders: {
    none: 'none',
    normal: '3px solid',
  },

  radii: {
    none: '0',
    normal: '4px',
    middle: '10px',
    round: '50%',
  },
});
