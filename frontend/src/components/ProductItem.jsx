import React from 'react'
import { Link } from 'react-router-dom'
import useScrollReveal from '../hooks/useScrollReveal'

function ProductItem({ id, image, name, price, index = 0 }) {

    const [cardRef, isCardRevealed] = useScrollReveal();

    // Calculate stagger delay based on index (0-9 for 10 items)
    const staggerClass = index < 10 ? `reveal-stagger-${index + 1}` : 'reveal-stagger-10';

    return (
        <div
            ref={cardRef}
            className={`group relative bg-(--surface) rounded-xl overflow-hidden shadow-soft-sm hover:shadow-soft-lg transition-all duration-300 reveal-stagger ${staggerClass} ${isCardRevealed ? 'revealed' : ''}`}
        >
            <Link className='block' to={`/product/${id}`}>
                {/* Product Image Container */}
                <div className='relative overflow-hidden bg-gray-50 dark:bg-(--surface-elevated)'>
                    <img
                        className='w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110'
                        src={image[0]}
                        alt={name}
                    />
                </div>

                {/* Product Info */}
                <div className='p-4'>
                    <h3 className='text-gray-900 dark:text-(--text) font-medium text-sm mb-2 line-clamp-2 hover:text-(--neon-accent) transition-colors duration-200'>
                        {name}
                    </h3>

                    <div className='flex items-center justify-between'>
                        <div className='flex items-baseline gap-1'>
                            <span className='text-lg font-bold text-(--neon-accent)'>
                                ₹{price}
                            </span>
                            <span className='text-xs text-gray-500 line-through'>
                                ₹{Math.round(price * 1.2)}
                            </span>
                        </div>

                        {/* Rating placeholder */}
                        <div className='flex items-center gap-1'>
                            <div className='flex text-yellow-400'>
                                {'★'.repeat(4)}
                                <span className='text-gray-300'>★</span>
                            </div>
                            <span className='text-xs text-gray-500'>(4.2)</span>
                        </div>
                    </div>

                    {/* Sale badge */}
                    <div className='mt-2'>
                        <span className='inline-block bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium'>
                            20% OFF
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ProductItem
