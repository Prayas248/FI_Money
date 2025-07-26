import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      text: true,
    },
    sku: {
      type: String,
      unique: true,
      trim: true,
      index: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    imageUrl: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

ProductSchema.plugin(mongoosePaginate);

const Product = model('Product', ProductSchema);

export default Product;