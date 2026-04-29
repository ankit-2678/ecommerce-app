import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';
import useScrollReveal from '../hooks/useScrollReveal';

function LatestCollection() {

    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);
    const [sectionRef, isSectionRevealed] = useScrollReveal();

    useEffect(() => {
        setLatestProducts(products.slice(0, 10));
    }, [products])
    return (
        <div ref={sectionRef} id='latest-collections' className={`my-10 reveal-fade-up ${isSectionRevealed ? 'revealed' : ''}`}>
            <div className='text-center py-8 text-3xl'><Title text1={'LATEST'} text2={'COLLECTIONS'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus et, doloribus laborum recusandae maxime ab sint placeat dolorum fugit doloremque commodi tempore quis vitae dolore magni molestias odit amet facere.
                </p>
            </div>

            {/* rendering products*/}

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-6 gap-y-8'>
                {
                    latestProducts.map((item, index) => (
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} index={index} />
                    ))
                }
            </div>


        </div>
    )
}

export default LatestCollection
