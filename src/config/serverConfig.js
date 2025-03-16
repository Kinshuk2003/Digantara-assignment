import dotenv from 'dotenv';

dotenv.config();

// Retrieve the port from the environment variables or use the default value
export const PORT = process.env.PORT || 3000;