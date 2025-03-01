import { Schema, model } from 'mongoose';

const categorySchema = new Schema(
    
    {
        name: {
            type: String,
            required: [true, 'Category name is required'],
            maxLength: [50, `Category name can't exceed 50 characters`],
            unique: true
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            maxLength: [100, `Category description can't exceed 100 characters`]
        }
    }
);

export default model('Category', categorySchema);