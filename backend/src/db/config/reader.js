import fs from "fs"
export default async function readSqlFile(filePath) {
  try {
    // reads the file content as a string
    const sqlContent = fs.readFileSync(filePath, 'utf-8');
    return sqlContent;
  } catch (error) {
    console.error('Error reading SQL file:', error);
    throw error;
  }
}