import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useStateContext } from '../../context/StateContext';
import { client, urlFor } from '../../lib/client'
import { Product } from '../../components';
import { useState, useEffect } from 'react'
import Head from 'next/head';


const ProductInfo = ({ singleProduct, allProducts }) => {

    const [index, setIndex] = useState(0);
    const { name, image, price, details } = singleProduct;
    const { qty, decQty, incQty, setQty, setShowCart, addProductIntoCart } = useStateContext();


    const handleBuyNow = () => {
        addProductIntoCart(singleProduct, qty);
        setShowCart(true);
    }


    // qes: how we track/know - new product come? 
    // ans: by the help of "singleProduct" props...
    // when new product come, then re-render this component...
    // & set quantity 1 for that specific product...
    useEffect(() => {
        setQty(1);
    }, [singleProduct]);



    return (
        <div>
            <Head>
                <title>{name}</title>
                <link rel="icon" href="/headPhone.ico" />
            </Head>

            <div className='product-detail-container'>
                <div>
                    <div className='image-container'>
                        <img
                            alt={name}
                            // change image by user hover state
                            // from image[array] index position number...
                            src={urlFor(image && image[index])}
                            className="product-detail-image" />
                    </div>


                    <div className='small-images-container'>
                        {
                            // display all image's about this product...
                            // when user hover into these image's... 
                            // that specific image going to display into big Image Holder...
                            // loop into image[array]
                            image?.map((item, i) => (
                                <img
                                    key={i}
                                    alt="images"
                                    src={urlFor(item)}
                                    // attach event/function with each item...
                                    // for listening user event...
                                    onMouseEnter={() => setIndex(i)}
                                    // conditionally CSS styling applying...
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
                                onClick={decQty}>
                                <AiOutlineMinus />
                            </span>
                            <span className='num'>
                                {qty}
                            </span>
                            <span className='plus'
                                onClick={incQty}>
                                <AiOutlinePlus />
                            </span>
                        </p>
                    </div>


                    <div className='buttons'>
                        <button type='button'
                            className='add-to-cart'
                            // for listening user event...
                            // attach event/function with this button...
                            onClick={() => addProductIntoCart(singleProduct, qty)}
                        >
                            Add to cart
                        </button>
                        <button type='button'
                            className='buy-now'
                            onClick={handleBuyNow}
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>


            <div className='mayLike-products-wrapper'>
                <h2>You may also like</h2>
                <div className='marquee'>

                    <div className='mayLike-products-container track'>
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

    // instantly return an object ({ }) from a function()
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




// for SSG ==> Static Site Generation
// by query ==> fetch all those data from Sanity BackEnd... 
// & pass these data into this Component by the help of props...
export const getStaticProps = async ({ params: { slug } }) => {

    const singleQuery = `*[_type == "product" && slug.current == "${slug}"][0]`;
    const productsQuery = `*[_type == "product"]`;

    const singleProduct = await client.fetch(singleQuery);
    const allProducts = await client.fetch(productsQuery);

    return {
        props: { singleProduct, allProducts }
    }
}