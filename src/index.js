import express from 'express';
import routers  from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routers );

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

