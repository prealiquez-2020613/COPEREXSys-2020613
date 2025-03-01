import { Schema, model } from 'mongoose';

const companySchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Company name is required'],
            maxLength: [100, 'Company name cannot exceed 100 characters'],
            trim: true
        },
        impactLevel: {
            type: String,
            enum: ['LOW', 'MEDIUM', 'HIGH'],
            uppercase: true,
            required: [true, 'Impact level is required']
        },
        yearsOfExperience: {
            type: Number,
            required: [true, 'Years of experience is required'],
            min: [1, 'Company must have at least 1 year of experience']
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, 'Category is required']
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
            maxLength: [13, 'Phone number cannot exceed 13 characters'],
            minLength: [8, 'Phone must be 8 numbers']
        }
    }
);

export default model('Company', companySchema);