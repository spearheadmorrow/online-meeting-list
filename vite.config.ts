import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react-swc';
import fs from 'fs';
import path from 'path';

const base = process.env.VITE_BASE || process.env.BASE || '/';

const copyPublicData = (): Plugin => {
  return {
    name: 'copy-public-data',
    async closeBundle() {
      try {
        const projectRoot = path.resolve(__dirname);
        const src = path.join(projectRoot, 'public', 'meetings.json');
        const assetsDir = path.join(projectRoot, 'build', 'assets');

        if (!fs.existsSync(src)) return;

        await fs.promises.mkdir(assetsDir, { recursive: true });
        const dest = path.join(assetsDir, 'meetings.json');
        await fs.promises.copyFile(src, dest);

        const rootCopy = path.join(projectRoot, 'build', 'meetings.json');
        try {
          await fs.promises.rm(rootCopy, { force: true });
        } catch (e) {
          console.error('Failed to remove root copy of meetings.json:', e);
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('[copy-public-data] failed to copy data directory:', err);
      }
    }
  };
};

export default defineConfig({
  base,
  plugins: [react(), copyPublicData()],
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'build',
    sourcemap: true
  }
});
