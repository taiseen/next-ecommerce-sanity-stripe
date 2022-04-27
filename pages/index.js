import { FooterBanner, HeroBanner, Product } from '../components'
import { client } from '../lib/client';


const Home = ({ products, banner }) => {

  return (
    <>
      <HeroBanner heroBanner={banner.length && banner[0]} />

      <div className="products-heading">
        <h2>Best Seller Products</h2>
        <p>speaker There are many variations passages</p>
      </div>

      <div className="products-container">
        {
          products?.map(product =>
            <Product key={product._id} product={product} />
          )
        }
      </div>

      <FooterBanner footerBanner={banner && banner[0]} />
    </>
  )
}

export default Home;



// for fetching data
// we dont use useEffect...
// we use getServerSideProps
// data fetching from api || cms we use...
export const getServerSideProps = async () => {
  // sanity query...
  // fetch all the "product" data from sanity dashboard...
  const productQuery = '*[_type == "product"]';
  const products = await client.fetch(productQuery);

  // fetch all the "banner" data from sanity dashboard...
  const bannerQuery = '*[_type == "banner"]';
  const banner = await client.fetch(bannerQuery);

  return {
    props: { products, banner }
  }
}