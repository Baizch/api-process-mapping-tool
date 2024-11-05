import express, { Application } from 'express';
import areaRoutes from './routes/areaRoutes';

const app: Application = express();
app.use(express.json());

app.use('/api/areas', areaRoutes);

const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
