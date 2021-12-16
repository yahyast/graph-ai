module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
        // cssnano: {},
        ...(true ? {cssnano: {}} : {}),
    },
};
