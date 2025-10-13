import React from 'react'
import productsData from '../data/ProductsData';
import { FaHeart, FaStar } from 'react-icons/fa';
import ProductSection from './ProductSection';

const FeaturedProd = () => {
    return (
        <div>
            <section className="pt-5 container">
                <div>
                    <div className="text-center">
                        <h2 className="display-5 fw-bold text-black">FEATURED PRODUCTS</h2>
                        <p className="text-muted">Discover our latest streetwear essentials</p>
                    </div>
                </div>
                <div className='d-flex justify-content-center gap-4 featuredSec flex-wrap'>
                    <ProductSection tag="NEW" products={productsData} />
                    <ProductSection tag="BEST SELLER" products={productsData} />
                    <ProductSection tag="TRENDING" products={productsData} />
                </div>
            </section>
        </div>
    )
}

export default FeaturedProd