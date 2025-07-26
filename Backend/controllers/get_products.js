import Product from '../models/Product.js';




const getProductsHandler = async (req, res) => {
  const { page = 1, limit = 10, search = '' } = req.query;

  const queryFilter = search ? { $text: { $search: search } } : {};

  
  
  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    sort: { createdAt: 'desc' },
  };
try {
    const result = await Product.paginate(queryFilter, options);

    const responsePayload = {
      items: result.docs,
      totalItems: result.totalDocs,
      currentPage: result.page,
      totalPages: result.totalPages,
    };

    res.status(200).json(responsePayload);
    
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching products.' });
  }
};

export default getProductsHandler;