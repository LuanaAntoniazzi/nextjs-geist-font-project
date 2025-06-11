const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Get the file path from the URL
    let filePath = '.' + req.url;
    
    // Default to index file
    if (filePath === './') {
        filePath = './public/empresas_farmaceuticas_global.html';
    }

    // Get the file extension
    const extname = String(path.extname(filePath)).toLowerCase();
    
    // MIME types mapping
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.svg': 'image/svg+xml'
    };

    // Set content type based on file extension
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    // Read and serve the file
    fs.readFile(filePath, (error, content) => {
        if (error) {
            console.error('Error reading file:', filePath, error);
            if (error.code === 'ENOENT') {
                res.writeHead(404);
                res.end('File not found');
            } else {
                res.writeHead(500);
                res.end('Server error: ' + error.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// Kill any existing process on port 8000 and start the server
const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
