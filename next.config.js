/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Exportar como sitio estático para Cloudflare Pages
  output: 'export',
  // Desactivar optimización de imágenes (no soportada en export estático)
  images: {
    unoptimized: true,
  },
  // Trailing slash para mejor compatibilidad
  trailingSlash: true,
};

module.exports = nextConfig;
