import express from 'express';
import {fileURLToPath} from 'url';
import { dirname, join } from 'path';

// get the current file's path
const __filename = fileURLToPath(import.meta.url);
// get the directory of the current file
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    service: 'movy-browser',
    timestamp: new Date().toISOString()
  })
})

// Serve static files from dist
app.use(express.static(join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
})

app.listen(PORT, () => {
  console.log(`Frontend server running on port ${PORT}`);
})
