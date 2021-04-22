const {withPlugins} = require('next-compose-plugins');
const withOptimizedImages = require('next-optimized-images');
const withFonts = require('next-fonts');
const withCSS = require('@zeit/next-css');

// next.js configuration
const nextConfig = {
    env: {
        STRIPE_PUBLIC_KEY: 'your_stripe_public_key_here',
        API_URL: 'http://localhost:5000/admin/graphql',
    },
    webpack: config => {
        config.resolve.modules.push(__dirname);

        config.resolve.alias = {
            ...config.resolve.alias,
        };
        return config;
    },
};

module.exports = withPlugins(
    [withCSS({
        cssLoaderOptions: {
            url: false
        }
    }), withOptimizedImages, withFonts],
    nextConfig
);
