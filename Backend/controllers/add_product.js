import Product from '../models/Product.js';

import { validationResult } from 'express-validator';

const createProductHandler = async (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).json({ errors: validationErrors.array() });
  }

  try {
    
    const newProduct = await Product.create(req.body);
    const productData = {
      ...newProduct.toObject(),
      product_id: newProduct._id,
    };

    return res.status(201).json(productData);
    
  } catch (error) {
    return res.status(409).json({ 
      message: 'A product with this identifier already exists.' 
    });
  }
};

export default createProductHandler;