// vite.config.js
import { defineConfig } from "file:///C:/Users/Emmanuel/Documents/GitHub/traccar-web/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Emmanuel/Documents/GitHub/traccar-web/node_modules/@vitejs/plugin-react/dist/index.mjs";
import svgr from "file:///C:/Users/Emmanuel/Documents/GitHub/traccar-web/node_modules/vite-plugin-svgr/dist/index.js";
import { VitePWA } from "file:///C:/Users/Emmanuel/Documents/GitHub/traccar-web/node_modules/vite-plugin-pwa/dist/index.js";
var vite_config_default = defineConfig(() => ({
  server: {
    port: 4e3,
    proxy: {
      "/api/socket": "wss:https://gps.bysmax.com/",
      "/api": "https://gps.bysmax.com/"
      //'/api/socket': 'wss:http://localhost:8082',
      //'/api': 'http://localhost:8082',
    }
  },
  build: {
    outDir: "build"
  },
  plugins: [
    svgr(),
    react(),
    VitePWA({
      includeAssets: ["favicon.ico", "apple-touch-icon-180x180.png"],
      workbox: {
        navigateFallbackDenylist: [/^\/api/],
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
        globPatterns: ["**/*.{js,css,html,woff,woff2,mp3}"]
      },
      manifest: {
        short_name: "GPS BYSMAX",
        name: "GPS BYSMAX",
        theme_color: "#0F52BA",
        icons: [
          {
            src: "pwa-64x64.png",
            sizes: "64x64",
            type: "image/png"
          },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      }
    })
  ]
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxFbW1hbnVlbFxcXFxEb2N1bWVudHNcXFxcR2l0SHViXFxcXHRyYWNjYXItd2ViXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxFbW1hbnVlbFxcXFxEb2N1bWVudHNcXFxcR2l0SHViXFxcXHRyYWNjYXItd2ViXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9FbW1hbnVlbC9Eb2N1bWVudHMvR2l0SHViL3RyYWNjYXItd2ViL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XHJcbmltcG9ydCBzdmdyIGZyb20gJ3ZpdGUtcGx1Z2luLXN2Z3InO1xyXG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSAndml0ZS1wbHVnaW4tcHdhJztcclxuXHJcbi8qIGVzbGludC1kaXNhYmxlIG5vLXRlbXBsYXRlLWN1cmx5LWluLXN0cmluZyAqL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKCkgPT4gKHtcclxuICBzZXJ2ZXI6IHtcclxuICAgIHBvcnQ6IDQwMDAsXHJcbiAgICBwcm94eToge1xyXG4gICAgICAnL2FwaS9zb2NrZXQnOiAnd3NzOmh0dHBzOi8vZ3BzLmJ5c21heC5jb20vJyxcclxuICAgICAgJy9hcGknOiAnaHR0cHM6Ly9ncHMuYnlzbWF4LmNvbS8nLFxyXG4gICAgICAvLycvYXBpL3NvY2tldCc6ICd3c3M6aHR0cDovL2xvY2FsaG9zdDo4MDgyJyxcclxuICAgICAgLy8nL2FwaSc6ICdodHRwOi8vbG9jYWxob3N0OjgwODInLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGJ1aWxkOiB7XHJcbiAgICBvdXREaXI6ICdidWlsZCcsXHJcbiAgfSxcclxuICBwbHVnaW5zOiBbXHJcbiAgICBzdmdyKCksXHJcbiAgICByZWFjdCgpLFxyXG4gICAgVml0ZVBXQSh7XHJcbiAgICAgIGluY2x1ZGVBc3NldHM6IFsnZmF2aWNvbi5pY28nLCAnYXBwbGUtdG91Y2gtaWNvbi0xODB4MTgwLnBuZyddLFxyXG4gICAgICB3b3JrYm94OiB7XHJcbiAgICAgICAgbmF2aWdhdGVGYWxsYmFja0RlbnlsaXN0OiBbL15cXC9hcGkvXSxcclxuICAgICAgICBtYXhpbXVtRmlsZVNpemVUb0NhY2hlSW5CeXRlczogMTAgKiAxMDI0ICogMTAyNCxcclxuICAgICAgICBnbG9iUGF0dGVybnM6IFsnKiovKi57anMsY3NzLGh0bWwsd29mZix3b2ZmMixtcDN9J10sXHJcbiAgICAgIH0sXHJcbiAgICAgIG1hbmlmZXN0OiB7XHJcbiAgICAgICAgc2hvcnRfbmFtZTogJ0dQUyBCWVNNQVgnLFxyXG4gICAgICAgIG5hbWU6ICdHUFMgQllTTUFYJyxcclxuICAgICAgICB0aGVtZV9jb2xvcjogJyMwRjUyQkEnLFxyXG4gICAgICAgIGljb25zOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogJ3B3YS02NHg2NC5wbmcnLFxyXG4gICAgICAgICAgICBzaXplczogJzY0eDY0JyxcclxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICdwd2EtMTkyeDE5Mi5wbmcnLFxyXG4gICAgICAgICAgICBzaXplczogJzE5MngxOTInLFxyXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogJ3B3YS01MTJ4NTEyLnBuZycsXHJcbiAgICAgICAgICAgIHNpemVzOiAnNTEyeDUxMicsXHJcbiAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxyXG4gICAgICAgICAgICBwdXJwb3NlOiAnYW55IG1hc2thYmxlJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgfSxcclxuICAgIH0pLFxyXG4gIF0sXHJcbn0pKTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF3VSxTQUFTLG9CQUFvQjtBQUNyVyxPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsZUFBZTtBQUd4QixJQUFPLHNCQUFRLGFBQWEsT0FBTztBQUFBLEVBQ2pDLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMLGVBQWU7QUFBQSxNQUNmLFFBQVE7QUFBQTtBQUFBO0FBQUEsSUFHVjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxFQUNWO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxLQUFLO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixRQUFRO0FBQUEsTUFDTixlQUFlLENBQUMsZUFBZSw4QkFBOEI7QUFBQSxNQUM3RCxTQUFTO0FBQUEsUUFDUCwwQkFBMEIsQ0FBQyxRQUFRO0FBQUEsUUFDbkMsK0JBQStCLEtBQUssT0FBTztBQUFBLFFBQzNDLGNBQWMsQ0FBQyxtQ0FBbUM7QUFBQSxNQUNwRDtBQUFBLE1BQ0EsVUFBVTtBQUFBLFFBQ1IsWUFBWTtBQUFBLFFBQ1osTUFBTTtBQUFBLFFBQ04sYUFBYTtBQUFBLFFBQ2IsT0FBTztBQUFBLFVBQ0w7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsWUFDTixTQUFTO0FBQUEsVUFDWDtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUNGLEVBQUU7IiwKICAibmFtZXMiOiBbXQp9Cg==
