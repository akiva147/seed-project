/* eslint-disable import/order */
/// <reference types="vitest" />

import react from '@vitejs/plugin-react-swc';
import { setDefaultResultOrder } from 'dns';
import * as path from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

setDefaultResultOrder('verbatim');

// https://vitejs.dev/config/
export default defineConfig(() => ({
    plugins: [react(), tsconfigPaths()],
    css: {
        modules: {
            generateScopedName: (name, filePath) => {
                const matches = path
                    .basename(filePath)
                    .match(/^([a-z-]+)(.module)?.s?css/);
                if (!matches) {
                    throw new Error();
                }
                const baseFilename = matches[1];
                return `${baseFilename}-${name}`;
            },
            localsConvention: 'camelCaseOnly',
        },
    },
    server: {
        port: 3000,
        strictPort: true,
        https: false,
        host: 'localhost',
    },
    build: {
        target: 'esnext',
    },
    optimizeDeps: {
        esbuildOptions: {
            target: 'esnext',
        },
    },
}));
