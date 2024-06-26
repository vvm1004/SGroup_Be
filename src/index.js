import express from 'express';
import { connection } from './database/config.js';
import routers from './apis/access/index.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routers);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

(async () => {
    try {
        await connection.getConnection();
        console.log('Database connection successful');
    } catch (error) {
        console.error('Database connection failed:', error);
    }
})();