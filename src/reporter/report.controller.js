import ExcelJS from "exceljs";
import Company from "../company/company.model.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export const generateReport = async (req, res) => {
    
    const { sortBy, category, experience } = req.query;

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    try {

        let filter = {};

        if (category) filter.category = category;
        if (experience) filter.yearsOfExperience = { $gte: Number(experience) };
        
        let sortOptions = {};
        if (sortBy === 'A-Z') sortOptions.name = 1;
        if (sortBy === 'Z-A') sortOptions.name = -1;
        if (sortBy === 'experience') sortOptions.yearsOfExperience = -1;

        const companies = await Company.find(filter).sort(sortOptions);

        if (!companies.length) {
            return res.status(404).send({ success: false, message: 'Companies with this filter not found' });
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Companies');

        worksheet.columns = [
            { header: 'Name', key: 'name', width: 30 },
            { header: 'Impact Level', key: 'impactLevel', width: 20 },
            { header: 'Years of experience', key: 'yearsOfExperience', width: 20 },
            { header: 'Category', key: 'category', width: 20 },
        ];

        companies.forEach((company) => {
            worksheet.addRow({
                name: company.name,
                impactLevel: company.impactLevel,
                yearsOfExperience: company.yearsOfExperience,
                category: company.category,
            });
        });

        const folderPath = path.join(__dirname, "report");
        const filePath = path.join(folderPath, "COPEREX_Report.xlsx");

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
            console.log('Folder REPORT created succesfully');
        }

        console.log("Excel file on:", filePath);

        await workbook.xlsx.writeFile(filePath);

        res.status(200).send({ message: "Report generated succesfully", filePath: filePath });
    } catch (err) {
        console.error("General Error", err);
        res.status(500).send("General Error");
    }
};