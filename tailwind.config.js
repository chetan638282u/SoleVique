/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
      "tertiary-fixed": "#e3e1ec",
      "outline-variant": "#c8c5cb",
      "error-container": "#ffdad6",
      "surface-tint": "#5f5e61",
      "on-surface-variant": "#47464b",
      "surface-variant": "#e5e2dd",
      "background": "#fcf9f4",
      "primary-container": "#1b1b1e",
      "error": "#ba1a1a",
      "primary-fixed": "#e4e1e6",
      "inverse-on-surface": "#f3f0eb",
      "surface-dim": "#dcdad5",
      "on-surface": "#1c1c19",
      "on-tertiary": "#ffffff",
      "surface": "#fcf9f4",
      "outline": "#77767b",
      "surface-container-low": "#f6f3ee",
      "tertiary": "#000000",
      "on-secondary": "#ffffff",
      "on-error": "#ffffff",
      "on-tertiary-container": "#83838c",
      "secondary": "#a23e18",
      "on-secondary-container": "#6f2000",
      "on-secondary-fixed": "#390c00",
      "on-tertiary-fixed": "#1a1b22",
      "on-primary-fixed-variant": "#47464a",
      "tertiary-fixed-dim": "#c6c5cf",
      "surface-container-high": "#ebe8e3",
      "on-background": "#1c1c19",
      "primary": "#000000",
      "surface-container-highest": "#e5e2dd",
      "inverse-primary": "#c8c5ca",
      "inverse-surface": "#31302d",
      "on-primary": "#ffffff",
      "tertiary-container": "#1a1b22",
      "primary-fixed-dim": "#c8c5ca",
      "secondary-fixed-dim": "#ffb59c",
      "surface-container": "#f0ede9",
      "on-tertiary-fixed-variant": "#46464e",
      "secondary-container": "#fe8357",
      "surface-container-lowest": "#ffffff",
      "on-primary-container": "#858387",
      "secondary-fixed": "#ffdbcf",
      "surface-bright": "#fcf9f4",
      "on-secondary-fixed-variant": "#822801",
      "on-error-container": "#93000a",
      "on-primary-fixed": "#1b1b1e",
      "brand": {
            "bg": "#F9F8F6",
            "surface": "#F7F4EF",
            "border": "#E5E0D8",
            "black": "#0A0A0A",
            "charcoal": "#1E1E24",
            "ember": "#D65A31",
            "ember-deep": "#C44D25",
            "muted": "#71717A"
      }
},
      fontFamily: {
      "label-md": [
            "Montserrat",
            "Inter",
            "sans-serif"
      ],
      "headline-sm": [
            "Montserrat",
            "Inter",
            "sans-serif"
      ],
      "headline-lg-mobile": [
            "Montserrat",
            "Inter",
            "sans-serif"
      ],
      "body-lg": [
            "Inter",
            "sans-serif"
      ],
      "label-sm": [
            "Montserrat",
            "Inter",
            "sans-serif"
      ],
      "headline-md": [
            "Montserrat",
            "Inter",
            "sans-serif"
      ],
      "headline-lg": [
            "Montserrat",
            "Inter",
            "sans-serif"
      ],
      "display-xl": [
            "Montserrat",
            "Inter",
            "sans-serif"
      ],
      "body-md": [
            "Inter",
            "sans-serif"
      ],
      "display-xl-mobile": [
            "Montserrat",
            "Inter",
            "sans-serif"
      ],
      "sans": [
            "Inter",
            "system-ui",
            "-apple-system",
            "BlinkMacSystemFont",
            "Segoe UI",
            "Roboto",
            "sans-serif"
      ],
      "display": [
            "Montserrat",
            "Inter",
            "system-ui",
            "sans-serif"
      ]
},
      fontSize: {
      "label-md": [
            "13px",
            {
                  "lineHeight": "18px",
                  "letterSpacing": "0.04em",
                  "fontWeight": "600"
            }
      ],
      "headline-sm": [
            "18px",
            {
                  "lineHeight": "24px",
                  "letterSpacing": "-0.01em",
                  "fontWeight": "600"
            }
      ],
      "headline-lg-mobile": [
            "28px",
            {
                  "lineHeight": "34px",
                  "letterSpacing": "-0.02em",
                  "fontWeight": "700"
            }
      ],
      "body-lg": [
            "16px",
            {
                  "lineHeight": "26px",
                  "letterSpacing": "-0.005em",
                  "fontWeight": "400"
            }
      ],
      "label-sm": [
            "11px",
            {
                  "lineHeight": "14px",
                  "letterSpacing": "0.08em",
                  "fontWeight": "700"
            }
      ],
      "headline-md": [
            "24px",
            {
                  "lineHeight": "32px",
                  "letterSpacing": "-0.015em",
                  "fontWeight": "700"
            }
      ],
      "headline-lg": [
            "40px",
            {
                  "lineHeight": "48px",
                  "letterSpacing": "-0.025em",
                  "fontWeight": "700"
            }
      ],
      "display-xl": [
            "56px",
            {
                  "lineHeight": "64px",
                  "letterSpacing": "-0.03em",
                  "fontWeight": "800"
            }
      ],
      "body-md": [
            "14px",
            {
                  "lineHeight": "22px",
                  "letterSpacing": "0em",
                  "fontWeight": "400"
            }
      ],
      "display-xl-mobile": [
            "36px",
            {
                  "lineHeight": "42px",
                  "letterSpacing": "-0.02em",
                  "fontWeight": "800"
            }
      ]
},
      spacing: {
      "space-sm": "0.75rem",
      "space-lg": "1.5rem",
      "gutter-desktop": "1.5rem",
      "margin-desktop": "3rem",
      "space-md": "1rem",
      "space-2xs": "0.25rem",
      "space-2xl": "3rem",
      "margin-mobile": "1.25rem",
      "space-4xl": "6rem",
      "gutter-mobile": "1rem",
      "space-xs": "0.5rem",
      "space-3xl": "4.5rem",
      "space-xl": "2rem"
},
      borderRadius: {
      "DEFAULT": "0.25rem",
      "lg": "0.5rem",
      "xl": "0.75rem",
      "full": "9999px"
},
      letterSpacing: {
      "tighter": "-0.04em",
      "tightest": "-0.06em"
},
      animation: {
      "float-subtle": "float 6s ease-in-out infinite",
      "pulse-soft": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite"
},
      keyframes: {
      "float": {
            "0%, 100%": {
                  "transform": "translateY(0px) rotate(0deg)"
            },
            "50%": {
                  "transform": "translateY(-10px) rotate(0.5deg)"
            }
      }
}
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
}
