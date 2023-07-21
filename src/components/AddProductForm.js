
import React, { useState } from 'react';
import { firestore } from '../firebase';

const AddProductForm = () => {
  const [product, setProduct] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    quantity: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    firestore.collection('products').add(product);
    setProduct({
      name: '',
      category: '',
      description: '',
      price: '',
      quantity: '',
    });
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Product Name" value={product.name} onChange={handleInputChange} />
       
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddProductForm;
