import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRoutes from './routes/api.js';
import { errorHandler } from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDist = path.join(__dirname, '../../frontend/dist');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('dev'));

// Serve built frontend if dist exists with aggressive no-cache on html to ensure users always get the latest bundle
app.use(
  express.static(frontendDist, {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.html') || filePath.endsWith('.json')) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
      }
    },
  })
);

// API Routes
app.use('/api', apiRoutes);

// Root Route: If opened in a web browser, redirect straight to frontend!
app.get('/', (req, res) => {
  if (req.accepts('html')) {
    return res.redirect('http://localhost:5173');
  }
  res.json({
    name: 'Internship Fullstack Backend API',
    status: 'Running',
    frontend: 'http://localhost:5173',
    docs: '/api/health',
  });
});

// Centralized error handling
app.use(errorHandler);

export default app;
