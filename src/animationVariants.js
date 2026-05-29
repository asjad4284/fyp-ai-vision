// Shared animation variants used across components
export const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };
export const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };
