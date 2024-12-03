import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'Gist AI',
    version: '0.0.1',
    description: 'Gist AI - Your AI-powered browser extension',
    permissions: [
      'storage',
      'tabs',
      'sidePanel',
      'activeTab'
    ],
  },
});
