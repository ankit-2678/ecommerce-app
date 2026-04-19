import React from 'react'
import { assets } from "../assets/assets";
import useScrollReveal from '../hooks/useScrollReveal';

function OurPolicy() {
    const [sectionRef, isSectionRevealed] = useScrollReveal();

    return (
        <div ref={sectionRef} className={`flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base reveal-fade-up ${isSectionRevealed ? 'revealed' : ''}`}>
            <div className={`reveal-stagger reveal-stagger-1 p-6 rounded-2xl bg-(--surface) border border-(--border) shadow-sm hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl transition-all duration-300 cursor-pointer ${isSectionRevealed ? 'revealed' : ''}`}>
                <div className='w-20 h-20 bg-(--surface-elevated) rounded-full flex items-center justify-center mx-auto mb-6 border border-(--border)'>
                    <img src={assets.exchange_icon} className='w-10 h-10 opacity-100' alt="" />
                </div>
                <p className='font-semibold text-(--text) mb-3 text-sm'>Easy Exchange Policy</p>
                <p className='text-(--muted) leading-6'>We offer hassle free exchange policy</p>
            </div>

            <div className={`reveal-stagger reveal-stagger-2 p-6 rounded-2xl bg-(--surface) border border-(--border) shadow-sm hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl transition-all duration-300 cursor-pointer ${isSectionRevealed ? 'revealed' : ''}`}>
                <div className='w-20 h-20 bg-(--surface-elevated) rounded-full flex items-center justify-center mx-auto mb-6 border border-(--border)'>
                    <img src={assets.quality_icon} className='w-10 h-10 opacity-100' alt="" />
                </div>
                <p className='font-semibold text-(--text) mb-3 text-sm'>7 Days return policy</p>
                <p className='text-(--muted) leading-6'>we provide 7 days free return policy</p>
            </div>

            <div className={`reveal-stagger reveal-stagger-3 p-6 rounded-2xl bg-(--surface) border border-(--border) shadow-sm hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl transition-all duration-300 cursor-pointer ${isSectionRevealed ? 'revealed' : ''}`}>
                <div className='w-20 h-20 bg-(--surface-elevated) rounded-full flex items-center justify-center mx-auto mb-6 border border-(--border)'>
                    <img src={assets.support_img} className='w-10 h-10 opacity-100' alt="" />
                </div>
                <p className='font-semibold text-(--text) mb-3 text-sm'>Best Customer Support</p>
                <p className='text-(--muted) leading-6'>We provide 24X7 support</p>
            </div>
        </div>
    )
}

export default OurPolicy
