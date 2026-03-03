import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Genera la carpeta /out necesaria para GitHub Pages
  images: {
    unoptimized: true, // Requerido porque GitHub Pages no tiene servidor de optimización de imágenes
  },
  // Reemplaza 'CambiosNuevaEscuela' con el nombre exacto de tu repositorio en GitHub
  basePath: '/CambiosNuevaEscuela',
};

export default nextConfig;