import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';


function RelatedProducts({ category, subCategory, productId }) {
    const { products } = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if (products.length > 0) {

            let productsCopy = products.slice();

            //  Remove current product
            productsCopy = productsCopy.filter(
                (item) => item._id !== productId
            );

            //  Match category & subcategory
            let filtered = productsCopy.filter(
                (item) =>
                    item.category?.toLowerCase() === category?.toLowerCase() &&
                    item.subCategory?.toLowerCase() === subCategory?.toLowerCase()
            );

            //  Fallback: if not enough products, use only category
            if (filtered.length < 5) {
                filtered = productsCopy.filter(
                    (item) =>
                        item.category?.toLowerCase() === category?.toLowerCase()
                );
            }

            //  Shuffle (randomize)
            filtered = filtered.sort(() => 0.5 - Math.random());

            //  Take 5
            setRelated(filtered.slice(0, 5));
        }
    }, [products, category, subCategory, productId]);
    return (
        <div className='my-24'>
            <div className='text-center text-3xl y-2'>
                <Title text1={'RELATED'} text2={'PRODUCTS'} />
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {related.map((item, index) => (
                    <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                ))}

            </div>

        </div>
    )
}

export default RelatedProducts
