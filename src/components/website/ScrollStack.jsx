import React, { useEffect, useRef, useCallback } from "react";

export const ScrollStackItem = ({ children, itemClassName = "" }) => (
  <div
    className={(
      "scroll-stack-card relative w-full my-8 p-8 md:p-12 rounded-[32px] shadow-[0_0_30px_rgba(0,0,0,0.06)] bg-white origin-top will-change-transform " +
      itemClassName
    ).trim()}
  >
    {children}
  </div>
);

const ScrollStack = ({
  children,
  className = "",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
}) => {
  const wrapperRef = useRef(null);
  const cardsRef = useRef([]);
  const lastTransformsRef = useRef(new Map());
  const tickingRef = useRef(false);

  const parsePercentage = useCallback((value, viewportHeight) => {
    if (typeof value === "string" && value.includes("%")) {
      return (parseFloat(value) / 100) * viewportHeight;
    }
    return parseFloat(value);
  }, []);

  const calculateProgress = useCallback((scrollY, start, end) => {
    if (scrollY < start) return 0;
    if (scrollY > end) return 1;
    return (scrollY - start) / (end - start);
  }, []);

  const updateTransforms = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || !cardsRef.current.length) return;

    const scrollY = window.scrollY || window.pageYOffset;
    const viewportH = window.innerHeight;
    const stackPos = parsePercentage(stackPosition, viewportH);
    const scaleEndPos = parsePercentage(scaleEndPosition, viewportH);
    const endEl = wrapper.querySelector(".scroll-stack-end");
    const endTop = endEl
      ? endEl.getBoundingClientRect().top + scrollY
      : Infinity;

    cardsRef.current.forEach((card, i) => {
      const rectTop = card.getBoundingClientRect().top + scrollY;
      const triggerStart = rectTop - stackPos - itemStackDistance * i;
      const triggerEnd = rectTop - scaleEndPos;
      const pinStart = rectTop - stackPos - itemStackDistance * i;
      const pinEnd = endTop - viewportH / 2;

      const scaleProgress = calculateProgress(
        scrollY,
        triggerStart,
        triggerEnd
      );
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let translateY = 0;
      const isPinned = scrollY >= pinStart && scrollY <= pinEnd;
      if (isPinned) {
        translateY = scrollY - rectTop + stackPos + itemStackDistance * i;
      } else if (scrollY > pinEnd) {
        translateY = pinEnd - rectTop + stackPos + itemStackDistance * i;
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
      };

      const last = lastTransformsRef.current.get(i);
      const changed =
        !last ||
        Math.abs(last.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(last.scale - newTransform.scale) > 0.001 ||
        Math.abs(last.rotation - newTransform.rotation) > 0.1;

      if (changed) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        card.style.transform = transform;
        lastTransformsRef.current.set(i, newTransform);
      }
    });

    tickingRef.current = false;
  }, [
    baseScale,
    calculateProgress,
    itemScale,
    itemStackDistance,
    parsePercentage,
    rotationAmount,
    scaleEndPosition,
    stackPosition,
  ]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    cardsRef.current = Array.from(
      wrapper.querySelectorAll(".scroll-stack-card")
    );

    const onScroll = () => {
      if (!tickingRef.current) {
        window.requestAnimationFrame(updateTransforms);
        tickingRef.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    updateTransforms();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      lastTransformsRef.current.clear();
      cardsRef.current = [];
    };
  }, [updateTransforms]);

  return (
    <div ref={wrapperRef} className={("relative w-full " + className).trim()}>
      <div className="pt-[20vh] px-4 md:px-20 pb-[60vh]">
        {children}
        <div className="scroll-stack-end w-full h-[1px]" />
      </div>
    </div>
  );
};

export default ScrollStack;
