import { createContext, useState } from "react";
import { products } from "../assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = (props)=>{

    const currency = '₹';
    const deliveryFee = 10;

    const [search, setsearch]=useState('');
    const [showSearch,setShowSearch]= useState(true)
    const value ={
        products,currency,deliveryFee,
        search,setsearch,showSearch,setShowSearch
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;