/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef } from "react";
import Navbar from "./components/Navbar";
import HeroSlider from "./components/HeroSlider";
import BrandStatement from "./components/BrandStatement";
import FirstSip from "./components/FirstSip";
import Stories from "./components/Stories";
import FullImage from "./components/FullImage";
import ProductSection from "./components/ProductSection";
import ProductBanner from "./components/ProductBanner";
import Footer from "./components/Footer";
import FloatingCart from "./components/FloatingCart";

export default function App() {
  // 각 ref 선언 및 용도 주석:
  // 1. heroRef: 홈페이지 최상단 및 메인 인트로 슬라이더 영역을 참조하며, 네비게이션의 HOMEPAGE 클릭 시 이곳으로 부드럽게 스크롤됩니다.
  const heroRef = useRef<HTMLDivElement | null>(null);

  // 2. storiesRef: 마르세유 헤리티지 설명과 아코디언이 내재된 스토리텔링 영역을 참조하며, 네비게이션의 STORIES 클릭 시 이곳으로 스크롤됩니다.
  const storiesRef = useRef<HTMLDivElement | null>(null);

  // 3. productRef: 3종의 커피 제품 디스플레이 카드와 상세 설명이 연결된 프로덕트 영역을 참조하며, 네비게이션의 PRODUCT 클릭 시 이곳으로 스크롤됩니다.
  const productRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="min-h-screen flex flex-col w-full bg-[#F5F0E8] overflow-x-hidden" id="app-root-container">
      {/* 
        렌더링 컴포넌트 순서 주석:
        1. Navbar: 최상단에 고정 배치되어 각 섹션 스크롤 제어를 조율합니다.
      */}
      <Navbar
        heroRef={heroRef}
        storiesRef={storiesRef}
        productRef={productRef}
      />

      {/* 메인 메인 컨텐츠 영역 시작 */}
      <main className="flex-grow w-full" id="app-main-content">
        {/* 
          2. HeroSlider: 오렌지 테두리를 가진 세련된 메인 슬라이더 (heroRef 장착)
        */}
        <HeroSlider heroRef={heroRef} />

        {/* 
          3. BrandStatement: 화이트 배경 위에 크고 파워풀하게 노출되는 뉴에드의 브랜드 철학 선언 텍스트
        */}
        <BrandStatement />

        {/* 
          4. FirstSip: 좌측 파란색 명조 타이틀과 우측 푸른빛 크림 소용돌이가 압도적인 인상을 주는 퍼스트 십 섹션
        */}
        <FirstSip />

        {/* 
          5. Stories: 프랑스 마르세유의 커피하우스 전통을 기리며 더보기 아코디언이 펼쳐지는 스토리텔링 섹션 (storiesRef 장착)
        */}
        <Stories storiesRef={storiesRef} />

        {/* 
          6. FullImage: 아름다운 선글라스 및 샌드비치 피서 묘사가 들어간 비율 기반의 전폭 브랜드 이미지 일러스트레이션
        */}
        <FullImage />

        {/* 
          7. ProductSection: 3종의 뉴에드 에디션 커피 셀렉션을 아름답게 조회하고 다이내믹 통합 아코디언 창이 전개되는 섹션 (productRef 장착)
        */}
        <ProductSection productRef={productRef} />

        {/* 
          8. ProductBanner: 오렌지 그라운드 위에 수놓아진 후각적·미각적 유도 제품 하단 밴너
        */}
        <ProductBanner />
      </main>

      {/* 
        9. Footer: 하단 극도의 미니멀리즘 다크 저작권 및 컨택트 포인트 명세 라인업
      */}
      <Footer />

      {/* 
        FloatingCart를 별도로 렌더링하는 이유 주석:
        FloatingCart 컴포넌트는 메인 문서 스크롤 흐름(Document layout flow)의 간섭을 받지 않고, 
        유저가 브라우저 내에서 종반 스크롤에 도달하든 초장에 머물든 관계없이 
        언제든 가장 편리한 지점(좌하단)에 굳건하게 오버레이 고정되어 있어야 하므로 
        레이아웃 외부 최하단에 fixed 포지션으로 단독 독립하여 렌더링을 처리했습니다.
      */}
       {/* <FloatingCart /> */}
    </div>
  );
}
