let lenis = null

export const setLenis = (instance) => { lenis = instance }
export const getLenis = () => lenis
export const pauseScroll = () => { if (lenis) lenis.stop() }
export const resumeScroll = () => { if (lenis) lenis.start() }
