import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { firestore } from '../firebase';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore.collection('products').onSnapshot((snapshot) => {
      const productData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(productData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong> - {product.description}
            <Link to={`/edit/${product.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
      <Link to="/add">Add Product</Link>
    </div>
  );
};

export default ProductList;
