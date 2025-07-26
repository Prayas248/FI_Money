import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import ApiService from '../services/api';

export default function AddProductModal({ productToEdit, onClose, onSuccess }) {
  const isEditMode = Boolean(productToEdit);

  const [product, setProduct] = useState({
    name: '',
    price: '',
    quantity: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

  // When the component loads, check if we're in edit mode.
  // If so, populate the form with the existing product's data.
  useEffect(() => {
    if (isEditMode) {
      setProduct({
        name: productToEdit.name || '',
        price: productToEdit.price || '',
        quantity: productToEdit.quantity || '0',
        description: productToEdit.description || ''
      });
    } else {
      // Ensure form is clear when opening in "add" mode
      setProduct({
        name: '',
        price: '',
        quantity: '',
        description: ''
      });
    }
  }, [productToEdit, isEditMode]);

  // A single handler to manage changes for all form inputs.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handles the form submission for both creating and updating a product.
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setApiError('');

    const payload = {
      ...product,
      price: parseFloat(product.price),
      quantity: parseInt(product.quantity, 10)
    };

    try {
      if (isEditMode) {
        await ApiService.updateProduct(productToEdit._id, payload);
      } else {
        await ApiService.addProduct(payload);
      }
      onSuccess(); // Signal success to the parent component
    } catch (err) {
      setApiError(err.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'add'} product.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Modal Backdrop */}
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold leading-6 text-slate-900" id="modal-title">
                  {isEditMode ? 'Edit Product' : 'Add New Product'}
                </h3>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1 rounded-full text-slate-400 hover:bg-slate-100"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="mt-6 space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={product.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-slate-300 bg-white shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-slate-700">Price</label>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      step="0.01"
                      min="0"
                      required
                      value={product.price}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-slate-300 bg-white shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-slate-700">Quantity</label>
                    <input
                      type="number"
                      name="quantity"
                      id="quantity"
                      min="0"
                      required
                      value={product.quantity}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-slate-300 bg-white shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description (Optional)</label>
                  <textarea
                    name="description"
                    id="description"
                    value={product.description}
                    onChange={handleChange}
                    rows="3"
                    className="mt-1 block w-full rounded-md border-slate-300 bg-white shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                  />
                </div>

                {apiError && (
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 text-sm text-red-700">
                    {apiError}
                  </div>
                )}

                <div className="pt-4 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex justify-center rounded-md border border-transparent bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Saving...' : (isEditMode ? 'Save Changes' : 'Add Product')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
