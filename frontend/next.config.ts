import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    compiler: {
        styledComponents: true,
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(frag|vert)$/,
            type: 'asset/source'
        })
        return config
    }
};

module.exports = nextConfig;
