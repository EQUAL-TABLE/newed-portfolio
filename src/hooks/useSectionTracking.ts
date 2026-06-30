import { useEffect } from "react";
import { trackSectionVisit } from "../lib/analytics";

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

// "의미 있는 방문"으로 인정하는 최소 체류시간(ms).
// 섹션을 떠나는 시점에 체류시간이 이 값 미만이면(= 스크롤로 스쳐 지나감)
// 이벤트를 보내지 않습니다. navbar 점프/빠른 스크롤로 거쳐 간 중간 섹션이
// 경로탐색을 오염시키는 것을 막습니다.
const MIN_VISIT_MS = 1000;

/**
 * 여러 섹션의 방문을 추적하는 훅.
 *
 * 동작:
 *  - 섹션이 화면의 50% 이상 보이면 진입 시각을 기록 (이때는 아직 전송 안 함)
 *  - 섹션이 화면에서 벗어나는 시점에 체류시간을 계산하여, 1초(MIN_VISIT_MS)
 *    이상이면 섹션당 고유 이벤트(section_<이름>)를 체류시간과 함께 1회 전송
 *  - 1초 미만이면(스쳐 지나감) 전송하지 않음
 *  - 같은 섹션에 다시 진입하면 다시 측정 → 재방문마다 매번 전송(왕복 동선 보존)
 *  - 탭 전환/페이지 종료 시점에도 현재 보고 있던 섹션을 정산(flush)하여
 *    "이탈 직전 마지막 섹션"을 놓치지 않음
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

    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    // 섹션을 떠나는 시점: 체류시간을 계산해 1초 이상이면 방문 1건을 전송하고
    // 진입 기록을 비웁니다. (1초 미만은 스쳐 지나간 것으로 보고 미전송)
    const flushVisit = (id: string) => {
      const start = enterTimes.get(id);
      if (start === undefined) return;
      enterTimes.delete(id);

      const elapsedMs = performance.now() - start;
      if (elapsedMs < MIN_VISIT_MS) return;

      const name = nameById.get(id);
      if (name) trackSectionVisit(name, Math.round(elapsedMs / 1000));
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
            // 진입: 체류시간 측정 시작 (전송은 이탈 시점에)
            if (!enterTimes.has(id)) {
              enterTimes.set(id, performance.now());
            }
          } else {
            // 이탈: 체류시간 정산 후 조건 충족 시 전송
            flushVisit(id);
          }
        }
      },
      { threshold: [0, VISIBILITY_THRESHOLD, 1] },
    );

    elements.forEach((el) => observer.observe(el));

    // 탭 전환/페이지 종료 시 현재 보고 있던 섹션들을 마저 정산
    const flushAll = () => {
      for (const id of Array.from(enterTimes.keys())) {
        flushVisit(id);
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
