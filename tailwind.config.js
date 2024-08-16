// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const plugin = require('tailwindcss/plugin')


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],  
  theme: {
    container: {
      padding: '6rem'
    },
    extend: {
      colors: {
        'primary': '#DE1369',
        'secondary': '#474747',
        'simple': '#2C2F24',
        'titule': '#414536',
        'iconFoo': '#DE1369',
        whiten: '#F1F5F9',
      },
    },
  },
  plugins: [
    plugin(function({ addComponents }){
      addComponents({
        '.btn-black': {
          fontSize: '0.875rem',
          fontWeight: 700,
          borderRadius: '9999px',
          borderStyle: 'solid',
          borderWidth: '2px',
          borderColor: 'black',
          paddingLeft: '1rem',       /* 16px */
          paddingRight: '1rem',      /* 16px */
          paddingTop: '0.375rem',    /* 6px */
          paddingBottom: '0.375rem', /* 6px */
          marginTop: '0.75rem',      /* 12px */
          marginBottom: '0.75rem',   /* 12px */
          transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDuration: '300ms',
          '&:hover': {
            backgroundColor: 'black',
            color: 'white'
          }
        },
        '.playfair': {
          fontFamily: '"Playfair Display", serif'
        },
        '.btn-navbar': {
          borderRadius: '9999px',
          paddingTop: '0.175rem',
          paddingBottom: '0.175rem',
          paddingLeft: '0.7rem',       /* 16px */
          paddingRight: '0.7rem',
          transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDuration: '300ms',
          '&:hover': {
            backgroundColor: 'rgba(219, 223, 208, 1)'
          }
        },
        '.btn-navbar-active' : {
          backgroundColor: 'rgba(219, 223, 208, 1)',
          borderRadius: '9999px',
          paddingTop: '0.175rem',
          paddingBottom: '0.175rem',
          paddingLeft: '0.7rem',       /* 16px */
          paddingRight: '0.7rem',
        },
        '.btn-red': {
          backgroundColor: 'rgba(222, 19, 105, 1)',
          color: 'white',
          fontSize: '0.875rem',      /* 14px */
          lineHeight: '1.25rem',
          fontWeight: 500,
          borderRadius: '9999px',
          borderColor: 'black',
          paddingLeft: '1rem',       /* 16px */
          paddingRight: '1rem',      /* 16px */
          paddingTop: '0.575rem',    /* 6px */
          paddingBottom: '0.575rem', /* 6px */
          marginTop: '0.75rem',      /* 12px */
          marginBottom: '0.75rem',   /* 12px */
          transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDuration: '300ms',
          '&:hover': {
            backgroundColor: 'rgba(242, 61, 136, 1)',
          }
        },
        '.btn-icon': {
          backgroundColor: '#F0F0F0',
          color: '#474747',
          borderRadius: '9999px',
          paddingTop: '0.8rem',
          paddingBottom: '0.8rem',
          paddingLeft: '0.8rem',       /* 16px */
          paddingRight: '0.8rem',
          transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDuration: '300ms',
        },
        '.btn-text-red': {
          color: 'rgba(222, 19, 105, 1)',
          fontWeight: 'bold',
          fontSize: '0.890rem',
          borderRadius: '9999px',
          paddingTop: '0.175rem',
          paddingBottom: '0.175rem',
          paddingLeft: '0.7rem',       /* 16px */
          paddingRight: '0.7rem',
          transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDuration: '300ms',
          '&:hover': {
            backgroundColor: 'rgba(222, 19, 105, 1)',
            color: 'white'
          }
        },
        '.btn-outlined': {
          fontSize: '0.875rem',      /* 14px */
          lineHeight: '1.25rem',
          fontWeight: 700,
          borderRadius: '9999px',
          borderWidth: '2px',
          borderColor: '#ECECEC',
          paddingLeft: '2rem',       /* 16px */
          paddingRight: '2rem',      /* 16px */
          paddingTop: '0.450rem',    /* 6px */
          paddingBottom: '0.450rem', /* 6px */
          marginTop: '0.75rem',      /* 12px */
          marginBottom: '0.75rem',   /* 12px */
          transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDuration: '300ms',
          '&:hover': {
            backgroundColor: 'rgba(222, 19, 105, 1)',
            borderColor: 'rgba(222, 19, 105, 1)',
            color: 'white'
          }
        },
        '.bg-secundary': {
          backgroundColor: '#F9F9F7'
        },
        '.bg-footer':{
          backgroundColor: '#474747'
        },
        '.btn-red-disabled' : {
          fontSize: '0.875rem',      /* 14px */
          lineHeight: '1.25rem',
          fontWeight: 700,
          borderRadius: '9999px',
          borderWidth: '2px',
          borderColor: '#FFA5A5',
          paddingLeft: '2rem',       /* 16px */
          paddingRight: '2rem',      /* 16px */
          paddingTop: '0.450rem',    /* 6px */
          paddingBottom: '0.450rem', /* 6px */
          marginTop: '0.75rem',      /* 12px */
          marginBottom: '0.75rem',   /* 12px */
          backgroundColor: '#FFA5A5',
          color: '#C9C7C7',
          cursor: 'not-allowed',
          '&:@apply': 'cursor-not-allowed',
        },
      })
    }),
    // eslint-disable-next-line no-undef
    require('tailwindcss-animated')
  ],
}

