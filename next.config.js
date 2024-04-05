/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol: 'https',
                hostname: '*.googleusercontent.com',
                // port:'',
                // pathname: '/account123/***',
            },
            {
                protocol: 'https',
                hostname:'alzu-web.s3.us-east-2.amazonaws.com',
            }
        ]
    }
};

module.exports = nextConfig;
