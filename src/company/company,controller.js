import Company from '../company/company.model.js';
import Category from '../category/category.model.js';

// Agregar una nueva empresa
export const addCompany = async (req, res) => {
    try {
        const data = req.body;
        
        const categoryExists = await Category.findById(data.category);
        if (!categoryExists) {
            return res.status(403).send({ success: false, message: 'Category not found' });
        }
        
        const newCompany = new Company(data);
        await newCompany.save();
        
        return res.send({ success: true, message: 'Company registered successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ success: false, message: 'General error registering the company', error });
    }
};

// Obtener todas las empresas con filtros y ordenamiento
export const getCompanies = async (req, res) => {
    try {
        const { sortBy, category, experience } = req.query;
        let filter = {};

        if (category) filter.category = category;
        if (experience) filter.yearsOfExperience = { $gte: Number(experience) };
        
        let sortOptions = {};
        if (sortBy === 'A-Z') sortOptions.name = 1;
        if (sortBy === 'Z-A') sortOptions.name = -1;
        if (sortBy === 'experience') sortOptions.yearsOfExperience = -1;

        const companies = await Company.find(filter).populate('category').sort(sortOptions);
        
        if (!companies.length) {
            return res.status(404).send({ success: false, message: 'Companies with this filter not found' });
        }
        
        return res.send({ success: true, companies });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ success: false, message: 'General error getting companies', error });
    }
};

// Obtener empresa por ID
export const getCompanyById = async (req, res) => {
    try {
        const { id } = req.params;
        const company = await Company.findById(id).populate('category');
        if (!company) {
            return res.status(404).send({ success: false, message: 'Company not found' });
        }
        return res.send({ success: true, company });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ success: false, message: 'General error getting the company', error });
    }
};

// Editar una empresa
export const updateCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        if (data.category) {
            const categoryExists = await Category.findById(data.category);
            if (!categoryExists) {
                return res.status(403).send({ success: false, message: 'Category not found' });
            }
        }

        const updatedCompany = await Company.findByIdAndUpdate(id, data, { new: true });
        if (!updatedCompany) {
            return res.status(404).send({ success: false, message: 'Company not found' });
        }
        return res.send({ success: true, message: 'Company updated successfully', updatedCompany });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ success: false, message: 'General error updating the company', error });
    }
};
