export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        screens: {
          xs: { max: "380px" }, // Custom breakpoint for devices <= 380px
        },
      },
    },
    plugins: [],
  };
  