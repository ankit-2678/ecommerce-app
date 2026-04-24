import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';
import useScrollReveal from '../hooks/useScrollReveal';

function BestSeller() {
    const { products } = useContext(ShopContext);
    const [bestseller, setBestseller] = useState([]);
    const [sectionRef, isSectionRevealed] = useScrollReveal();

    useEffect(() => {
        if (!products || products.length === 0) return;
        const bestProduct = products.filter((item) => (item.bestseller))
        //console.log(bestProduct)
        setBestseller(bestProduct.slice(0, 5))
    }, [products])
    return (
        <div ref={sectionRef} className={`my-10 reveal-fade-up ${isSectionRevealed ? 'revealed' : ''}`}>
            <div className='text-center text-3xl py-8'>
                <Title text1={'BEST'} text2={'SELLERS'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque voluptate quis incidunt quia quasi adipisci quam fugiat sit, dolorum sequi doloremque quos! Aspernatur dolor aut saepe deleniti. Voluptatem, ut accusamus!
                </p>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 gap-y-8' >
                {
                    bestseller.map((item,index)=>(
                        <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} index={index}/>
                    ))
                }
            </div>
        </div>
    )
}

export default BestSeller
