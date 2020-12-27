import React, { createContext, useState, useEffect } from 'react';

export const ProductsContext = createContext()

const ProductsContextProvider = ({children}) => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let mounted = true;
        fetch('https://fakestoreapi.com/products/')
            .then(response => response.json())
            .then(response => {
                if(mounted) {
                    setProducts(response)
                }
            })
            return () => mounted = false;
    }, []);

    return (
        <>
            {loading && (
                <div style={{ color: `green` }}>
                loading products from the Fake API Store
                </div>
            )}
            {error && (
                <div style={{ color: `red` }}>
                some error occurred, while fetching api
                </div>
            )}
            <ProductsContext.Provider value={{products}}>
                { children }
            </ProductsContext.Provider>
        </>
        );
    }
    
    export default ProductsContextProvider;