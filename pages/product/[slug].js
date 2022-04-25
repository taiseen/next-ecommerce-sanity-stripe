
import Head from 'next/head';
import { useState } from 'react'
import { Product } from './../../components';
import { client, urlFor } from '../../lib/client'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

const ProductInfo = ({ singleProduct, allProducts }) => {

    const { name, image, price, slug, details } = singleProduct;

    const [index, setIndex] = useState(0);

    return (
        <div>
            <Head>
                <title>{name}</title>
            </Head>

            <div className='product-detail-container'>
                <div>
                    <div className='image-container'>
                        <img
                            alt={name}
                            src={urlFor(image && image[index])}
                            className="product-detail-image" />
                    </div>


                    <div className='small-images-container'>
                        {
                            image?.map((item, i) => (
                                <img
                                    key={i}
                                    alt="images"
                                    src={urlFor(item)}
                                    onMouseEnter={() => setIndex(i)}
                                    className={i === index
                                        ? 'small-image selected-image'
                                        : 'small-image'}
                                />
                            ))
                        }
                    </div>
                </div>


                <div className='product-detail-desc'>
                    <h1>{name}</h1>

                    <div className='reviews'>
                        <div>
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar />
                        </div>
                        <p>(20)</p>
                    </div>

                    <h4>Details : </h4>
                    <p>{details}</p>
                    <p className='price'>${price}</p>

                    <div className='quantity'>
                        <h3>Quantity:</h3>
                        <p className='quantity-desc'>
                            <span className='minus'
                                onClick=''>
                                <AiOutlineMinus />
                            </span>
                            <span className='num'
                                onClick=''>
                                0
                            </span>
                            <span className='plus'
                                onClick=''>
                                <AiOutlinePlus />
                            </span>
                        </p>
                    </div>


                    <div className='buttons'>
                        <button type='button'
                            className='add-to-cart'
                            onClick=''
                        >
                            Add to cart
                        </button>
                        <button type='button'
                            className='buy-now'
                            onClick=''
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>


            <div className='maylike-products-wrapper'>
                <h2>You may also like</h2>
                <div className='marquee'>

                    <div className='maylike-products-container track'>
                        {
                            allProducts.map(item => (
                                <Product key={item._id} product={item} />
                            ))

                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProductInfo





export const getStaticPaths = async () => {

    // give me all the products but dont the return all the data of the all products
    // just give me current 'slug' property info about all the products...
    const productsQuery = `*[_type == "product"]{
        slug {
            current
        }
    }`;

    const allProducts = await client.fetch(productsQuery);

    const paths = allProducts.map(product => ({
        params: {
            slug: product.slug.current
        }
    }))

    return {
        paths,
        fallback: 'blocking'
    }
}





export const getStaticProps = async ({ params: { slug } }) => {

    const singleQuery = `*[_type == "product" && slug.current == "${slug}"][0]`;
    const productsQuery = `*[_type == "product"]`;

    const singleProduct = await client.fetch(singleQuery);
    const allProducts = await client.fetch(productsQuery);

    return {
        props: { singleProduct, allProducts }
    }
}