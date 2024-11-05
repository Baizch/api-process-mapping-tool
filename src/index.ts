import express, { Application } from 'express';
import areaRoutes from './routes/areasRoutes';
import processRoutes from './routes/processesRoutes';

const app: Application = express();
app.use(express.json());

app.use('/api/areas', areaRoutes);
app.use('/api/processes', processRoutes);

const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
