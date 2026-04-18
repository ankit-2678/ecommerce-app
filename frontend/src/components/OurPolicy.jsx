import React from 'react'
import { assets } from "../assets/assets";
import useScrollReveal from '../hooks/useScrollReveal';

function OurPolicy() {
    const [sectionRef, isSectionRevealed] = useScrollReveal();

    return (
        <div ref={sectionRef} className={`flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700 reveal-fade-up ${isSectionRevealed ? 'revealed' : ''}`}>
            <div className={`reveal-stagger reveal-stagger-1 ${isSectionRevealed ? 'revealed' : ''}`}>
                <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="" />
                <p className='font-semibold'>Easy Exchange Policy</p>
                <p className='text-gray-400'>We offer hassle free exchange policy</p>
            </div>

            <div className={`reveal-stagger reveal-stagger-2 ${isSectionRevealed ? 'revealed' : ''}`}>
                <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt="" />
                <p className='font-semibold'>7 Days return policy</p>
                <p className='text-gray-400'>we provide 7 days free return policu</p>
            </div>

            <div className={`reveal-stagger reveal-stagger-3 ${isSectionRevealed ? 'revealed' : ''}`}>
                <img src={assets.support_img} className='w-12 m-auto mb-5' alt="" />
                <p className='font-semibold'>Best Customer Support</p>
                <p className='text-gray-400'>We provide 24X7 support</p>
            </div>
        </div>
    )
}

export default OurPolicy
