
import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';

const EditProductForm = ({ match }) => {
  const productId = match.params.id;
  const [product, setProduct] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    quantity: '',
  });

  useEffect(() => {
    const getProduct = async () => {
      const productRef = firestore.collection('products').doc(productId);
      const snapshot = await productRef.get();

      if (snapshot.exists) {
        setProduct(snapshot.data());
      }
    };

    getProduct();
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    firestore.collection('products').doc(productId).update(product);
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Product Name" value={product.name} onChange={handleInputChange} />
       
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditProductForm;
