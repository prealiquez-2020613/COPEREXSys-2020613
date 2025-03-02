import Category from '../category/category.model.js';

//Agregar Categoria
export const addCategory = async(req, res)=>{
    try{

        let data = req.body;
        let category = new Category(data);

        await category.save()
        return res.send({succes : true, message: 'Category added successfully'});

    }catch(error){
        console.error(error)
        return res.status(500).send({ success: false, message: 'General error saving category', error});
    }
};

//Listar Categorías
export const allCategories = async (req, res) => {
    try {

        const categories = await Category.find();
        return res.send({ success: true, message: 'Categories retrieved successfully', categories });

    } catch (error) {
        console.error(error);
        return res.status(500).send({ success: false, message: 'General Error', error });
    }
};


//Update Categoria
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const updatedCategory = await Category.findByIdAndUpdate(id, { name, description }, { new: true });

        if (!updatedCategory) {
            return res.status(404).send({ success: false, message: 'Category not found' });
        }

        return res.send({ success: true, message: 'Category updated successfully', category: updatedCategory });

    } catch (error) {
        console.error(error);
        return res.status(500).send({ success: false, message: 'General Error', error });
    }
};