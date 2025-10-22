import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

const base = process.env.VITE_BASE || process.env.BASE || '/online-meeting-list';

export default defineConfig({
  base,
  plugins: [react()],
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'build',
    sourcemap: true
  }
});
