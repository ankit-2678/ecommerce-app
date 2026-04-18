import React from 'react'
import useScrollReveal from '../hooks/useScrollReveal';

function NewsLetterBox() {
    const [sectionRef, isSectionRevealed] = useScrollReveal();

    const onSubmithandler=(event)=>{
        event.preventDefault();

    }
    return (
        <div ref={sectionRef} className={`text-center reveal-scale ${isSectionRevealed ? 'revealed' : ''}`}>
            <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
            <p className='text-gary-400 mt-3'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla unde officia labore! Porro nobis nisi iure quae ab, quos, aliquam voluptates ad sint cum, dolorem pariatur fugit natus mollitia praesentium?
            </p>
            <form onSubmit={onSubmithandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3' >
                <input className='w-full sm:flex-1 outline-none ' type="email" placeholder='enter your email' required />
                <button className='bg-black text-white text-xs px-10 py-4 ' type='submit'>SUBSCRIBE</button>
            </form>

        </div>
    )
}

export default NewsLetterBox
