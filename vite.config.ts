import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react-swc';
import fs from 'fs';
import path from 'path';

const base = process.env.VITE_BASE || process.env.BASE || '/';

// Small plugin to copy `public/meetings.json` into the build assets directory.
// This keeps the single meetings file alongside other static assets
// (build/assets/meetings.json) so the output layout is simpler.
const copyPublicData = (): Plugin => {
  return {
    name: 'copy-public-data',
    async closeBundle() {
      try {
        const projectRoot = path.resolve(__dirname);
        const src = path.join(projectRoot, 'public', 'meetings.json');
        const assetsDir = path.join(projectRoot, 'build', 'assets');

        if (!fs.existsSync(src)) return;

        // Use fs.promises.cp when available (Node 16.7+), otherwise fall back to manual copy
        // Ensure assets dir exists
        await fs.promises.mkdir(assetsDir, { recursive: true });
        const dest = path.join(assetsDir, 'meetings.json');
        // Prefer fs.cp when available
        if ((fs as any).promises && (fs as any).promises.cp) {
          (await (fs as any).promises.copyFile)
            ? fs.promises.copyFile(src, dest)
            : (fs as any).promises.cp(src, dest);
        } else {
          await fs.promises.copyFile(src, dest);
        }
      } catch (err) {
        // Don't fail the build for copy errors; log for debugging
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
