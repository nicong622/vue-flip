import { nextTick } from 'vue';

function createChildElementRectMap(nodes) {
  if (!nodes) return new Map();

  const elements = [...nodes.children];
  return new Map(elements.map((node) => {
    return [node, node.getBoundingClientRect()]
  }));
}

export function useFlip(listRef) {
  let lastRect = new Map();

  function flip() {
    lastRect = createChildElementRectMap(listRef.value);

    nextTick(() => {
      const currentRectMap = createChildElementRectMap(listRef.value);

      lastRect.forEach((prevRect, node) => {
        const currentRect = currentRectMap.get(node);

        // Invert
        const invert = {
          left: prevRect.left - currentRect.left,
          top: prevRect.top - currentRect.top,
        };

        const keyframes = [
          { transform: `translate(${invert.left}px, ${invert.top}px)` },
          { transform: 'translate(0, 0)' },
        ];

        // Play 执行动画
        node.animate(keyframes, {
          duration: 500,
          easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
        });
      });
    });
  }

  return { flip };
}
