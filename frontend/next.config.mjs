/** @type {import('next').NextConfig} */

  import withBundleAnalyzer from '@next/bundle-analyzer';

  const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost:8000',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: 'backend',
                port: '',
                pathname: '/**',
            },
            {
              protocol: 'https',
              hostname: 'backend.railway.internal',
              port: '',
              pathname: '/**',
            }
            ],
    },
    reactStrictMode: true,
  };
  
  const bundleAnalyzer = withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
  });
  
  export default process.env.ANALYZE === 'true' ? bundleAnalyzer(nextConfig) : nextConfig;
