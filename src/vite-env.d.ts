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

  // 네이버 검색광고(SA) 전환 추적: index.html의 //wcs.naver.net/wcslog.js가
  // 로드된 뒤 전역에 주입됩니다. 로드 이전/실패 시 undefined일 수 있어 optional로 선언합니다.
  wcs?: {
    // 전환 이벤트 전송: trans({ type: 'lead' | 'schedule' | 'view_content' | 'custom001'~ })
    trans: (conv: Record<string, string>) => void;
    // 유입 추적
    inflow: (domain?: string) => void;
  };
  // 수집 실행 함수 (PV: 인자 없음 / 전환: cnv가 담긴 객체 전달)
  wcs_do?: (nasa?: Record<string, string>) => void;
  // 계정 공통키(Site ID)가 담기는 전역 객체 (index.html에서 wa 설정)
  wcs_add?: Record<string, string>;
  // 네이버 수집 파라미터 컨테이너 전역 객체
  _nasa?: Record<string, string>;
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