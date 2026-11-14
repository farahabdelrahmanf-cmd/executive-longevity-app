import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Register Service Worker for Samsung Galaxy & Android PWA Installation & Offline Support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Relative registration ensures it works under GitHub Pages subpaths and custom domains
    const swUrl = `${import.meta.env.BASE_URL}sw.js`;
    navigator.serviceWorker.register(swUrl)
      .then((reg) => {
        console.log('Longevity OS Service Worker registered successfully:', reg.scope);
      })
      .catch((err) => {
        console.warn('Service Worker registration note:', err);
      });
  });
}
