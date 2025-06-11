import express from 'express';
import { PORT } from './config/serverConfig.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the backend server!'
    });
}
);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });