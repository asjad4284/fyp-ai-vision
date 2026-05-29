import { memo, useState, useRef, useEffect } from 'react';

const Counter = memo(function Counter({ to, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let c = 0;
        const step = to / 80;
        const t = setInterval(() => {
          c += step;
          if (c >= to) { setCount(to); clearInterval(t); }
          else setCount(Math.floor(c));
        }, 20);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);

  return <span ref={ref}>{count}{suffix}</span>;
});

export default Counter;
