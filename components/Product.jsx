import { urlFor } from '../lib/client'
import Link from 'next/link'


const Product = ({ product }) => {

  const { name, image, price, slug } = product;

  return (
    <div>

      <Link href={`/product/${slug.current}`} passHref>
        
        <div className="product-card">
          <img
            width={250}
            height={250}
            alt="product"
            className="product-image"
            src={urlFor(image && image[0])}
          />

          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>

      </Link>
    </div>
  )
}

export default Product