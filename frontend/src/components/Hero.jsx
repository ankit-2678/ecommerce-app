import React from 'react'
import { assets } from "../assets/assets";
import useScrollReveal from '../hooks/useScrollReveal';

function Hero() {
  const [heroRef, isHeroRevealed] = useScrollReveal();

  return (
    <section ref={heroRef} className={`relative overflow-hidden rounded-4xl border border-white/10 bg-white shadow-[0_40px_100px_-60px_rgba(15,23,42,0.25)] dark:bg-slate-950 dark:shadow-[0_40px_120px_-70px_rgba(15,23,42,0.75)] reveal-fade-up ${isHeroRevealed ? 'revealed' : ''}`}>
      <div className='pointer-events-none absolute inset-x-0 top-0 h-56 bg-linear-to-b from-slate-900/8 to-transparent dark:from-slate-900/50' />
      <div className='pointer-events-none absolute -left-16 top-10 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl dark:bg-cyan-500/15' />
      <div className='pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl dark:bg-violet-500/15' />

      <div className='grid gap-12 lg:grid-cols-[1.05fr_0.95fr] p-8 md:p-12 lg:p-16'>
        <div className='flex flex-col justify-center gap-10'>
          {/* Badge */}
          <div className={`inline-flex items-center gap-3 rounded-full bg-slate-100 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.4em] text-slate-700 shadow-soft-sm ring-1 ring-slate-200 dark:bg-white/10 dark:text-slate-300 dark:ring-slate-500/40 dark:shadow-soft-sm w-fit reveal-fade-down ${isHeroRevealed ? 'revealed' : ''}`}>
            <span className='inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-sm' />
            OUR BESTSELLERS
          </div>

          {/* Headline and Description */}
          <div className={`space-y-6 lg:space-y-8 reveal-fade-left ${isHeroRevealed ? 'revealed' : ''}`}>
            <div className='space-y-3'>
              <p className='text-sm font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400'>
                Premium Fashion
              </p>
              <h1 className='prata-regular text-5xl font-bold leading-[1.1] tracking-[-0.04em] text-slate-950 sm:text-6xl lg:text-7xl xl:text-8xl dark:text-white'>
                Discover Modern Elegance
              </h1>
            </div>

            <p className='max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300'>
              Shop the newest arrivals in premium menswear, carefully curated for your everyday style. Experience elevated essentials with high-contrast details and effortless elegance.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className={`flex flex-col gap-4 pt-4 sm:flex-row sm:items-center reveal-fade-up ${isHeroRevealed ? 'revealed' : ''}`}>
            <a href='#latest-collections' className='inline-flex items-center justify-center rounded-full bg-slate-950 px-8 py-4 text-sm font-bold uppercase tracking-[0.1em] text-white shadow-soft-lg transition duration-300 hover:-translate-y-1 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:shadow-soft-md dark:hover:bg-slate-100 dark:neon-border-accent dark:border-2'>
              Shop Now
            </a>
            <a href='/collection' className='inline-flex items-center justify-center rounded-full border-2 border-slate-300 bg-white/80 px-8 py-4 text-sm font-bold uppercase tracking-[0.1em] text-slate-900 shadow-soft-sm transition duration-300 hover:-translate-y-1 hover:border-slate-400 hover:bg-slate-100 dark:border-slate-500 dark:bg-slate-900/40 dark:text-slate-100 dark:shadow-soft-md dark:hover:bg-slate-800 dark:hover:border-slate-400 dark:neon-border-accent'>
              Browse Collection
            </a>
          </div>
        </div>

        <div className={`relative flex items-center justify-center reveal-scale ${isHeroRevealed ? 'revealed' : ''}`}>
          <div className='absolute inset-0 rounded-[1.75rem] bg-linear-to-br from-cyan-400/10 via-transparent to-violet-500/10 opacity-80 dark:opacity-100' />
          <div className='relative w-full overflow-hidden rounded-4xl bg-slate-950 p-4 shadow-soft-lg dark:shadow-soft-lg depth-3 dark:bg-slate-900/80 dark:border dark:border-slate-700/40'>
            <div className='absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/50 to-transparent opacity-80' />
            <img className='relative h-full w-full rounded-3xl object-cover shadow-soft-md dark:shadow-soft-md' src={assets.hero_img} alt='Featured product' />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
