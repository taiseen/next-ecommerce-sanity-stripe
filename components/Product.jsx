import Link from 'next/link'
import { urlFor } from '../lib/client'

const Product = ({ product }) => {

  const { name, image, price, slug } = product;

  return (
    <div>
      <Link href={`/product/${slug.current}`} passHref>
        <div className="product-card">
          <img src={urlFor(image && image[0])} alt="product" width={250} height={250} className="product-image" />

          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product