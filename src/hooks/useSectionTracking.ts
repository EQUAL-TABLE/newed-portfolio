import { useEffect } from "react";
import { trackSectionView, trackSectionDwell } from "../lib/analytics";

/**
 * 추적 대상 섹션 정의: DOM 요소의 id 와 GA4에 기록될 섹션 이름의 매핑.
 */
export interface TrackedSection {
  /** 컴포넌트 루트 요소의 id 속성 */
  id: string;
  /** GA4 이벤트에 기록할 섹션 이름 */
  name: string;
}

// 섹션이 "보고 있는 중"으로 간주되는 노출 비율 임계값 (50%)
const VISIBILITY_THRESHOLD = 0.5;

/**
 * 여러 섹션의 스크롤 노출(section_view)과 체류시간(section_dwell)을 추적하는 훅.
 *
 * 동작:
 *  - 섹션이 화면의 50% 이상 보이면 진입 시각을 기록하고 최초 1회 section_view 전송
 *  - 섹션이 화면에서 벗어나면 진입~이탈 시간차를 section_dwell(초)로 전송
 *  - 탭 전환/페이지 종료 시점에도 현재 보고 있던 섹션들의 체류시간을 flush
 *
 * App 에서 한 번만 호출하며, 섹션 컴포넌트 자체는 수정하지 않습니다(각 섹션의 id로 관찰).
 */
export function useSectionTracking(sections: TrackedSection[]): void {
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    // id → 섹션 이름 빠른 조회
    const nameById = new Map(sections.map((s) => [s.id, s.name]));
    // 현재 보이는 섹션의 진입 시각(performance.now 기준 ms)
    const enterTimes = new Map<string, number>();
    // 이미 section_view를 전송한 섹션 (세션 내 1회만)
    const viewed = new Set<string>();

    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    // 특정 섹션의 체류시간을 계산해 전송하고 진입 기록을 비움
    const flushDwell = (id: string) => {
      const start = enterTimes.get(id);
      if (start === undefined) return;
      const seconds = Math.round((performance.now() - start) / 1000);
      const name = nameById.get(id);
      if (name) trackSectionDwell(name, seconds);
      enterTimes.delete(id);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          const name = nameById.get(id);
          if (!name) continue;

          const visible =
            entry.isIntersecting &&
            entry.intersectionRatio >= VISIBILITY_THRESHOLD;

          if (visible) {
            // 진입: 노출 1회 기록 + 체류 타이머 시작
            if (!viewed.has(id)) {
              viewed.add(id);
              trackSectionView(name);
            }
            if (!enterTimes.has(id)) {
              enterTimes.set(id, performance.now());
            }
          } else {
            // 이탈: 체류시간 전송
            flushDwell(id);
          }
        }
      },
      { threshold: [0, VISIBILITY_THRESHOLD, 1] },
    );

    elements.forEach((el) => observer.observe(el));

    // 탭 전환/페이지 종료 시 현재 보고 있던 섹션들의 체류시간을 마저 전송
    const flushAll = () => {
      for (const id of Array.from(enterTimes.keys())) {
        flushDwell(id);
      }
    };
    const handleVisibility = () => {
      if (document.visibilityState === "hidden") flushAll();
    };
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("pagehide", flushAll);

    return () => {
      flushAll();
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("pagehide", flushAll);
    };
  }, [sections]);
}
