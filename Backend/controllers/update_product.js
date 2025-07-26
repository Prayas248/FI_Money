import Product from "../models/Product.js";



const updateProductHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        const updatedDocument = await Product.findByIdAndUpdate(
            id,
            { $set: { quantity: quantity } },
            { new: true, runValidators: true }
        );

        
        
        if (!updatedDocument) {
            return res.status(404).json({ message: 'The requested product could not be found.' });
        }

        
        
        return res.status(200).json(updatedDocument);

    } catch (error) {
        return res.status(500).json({ message: 'An error occurred while updating the product.' });
    }
};

export default updateProductHandler;