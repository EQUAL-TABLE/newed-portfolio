/// <reference types="vite/client" />

// Vite 환경변수 타입 정의 (AWS Amplify 콘솔에서 주입하는 VITE_GA_ID 포함)
interface ImportMetaEnv {
  readonly VITE_GA_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Google Analytics(gtag.js) 전역 함수 및 dataLayer 타입 선언
// (이 파일은 모듈이 아닌 전역 스크립트이므로 declare global 래퍼 없이 직접 선언)
interface Window {
  dataLayer: unknown[];
  gtag: (...args: unknown[]) => void;
}

declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module "*.webp" {
  const value: string;
  export default value;
}