import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {initGA} from './lib/analytics';

// Google Analytics 4 초기화 (VITE_GA_ID 환경변수가 있을 때만 활성화)
initGA();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
