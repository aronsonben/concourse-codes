import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  // Set CORS headers to allow requests from your domain
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const filePath = path.join(process.cwd(), 'microblog.json');

  // GET: Return all microblog entries
  if (req.method === 'GET') {
    try {
      if (!fs.existsSync(filePath)) {
        return res.status(200).json([]);
      }
      
      const data = fs.readFileSync(filePath, 'utf8');
      const entries = JSON.parse(data);
      
      return res.status(200).json(entries);
    } catch (error) {
      console.error('Error reading microblog data:', error);
      return res.status(500).json({ error: 'Failed to load entries' });
    }
  }

  // POST: Add new microblog entry
  if (req.method === 'POST') {
    try {
      const { subject, content } = req.body;

      // Validate input
      if (!content || content.trim().length === 0) {
        return res.status(400).json({ error: 'Content is required' });
      }

      if (content.length > 5000) {
        return res.status(400).json({ error: 'Content too long (max 5000 characters)' });
      }

      // Create new entry
      const newEntry = {
        id: Date.now().toString(),
        subject: subject ? subject.trim() : '',
        content: content.trim(),
        timestamp: new Date().toISOString(),
        date: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      // Read existing entries
      let entries = [];
      if (fs.existsSync(filePath)) {
        const existingData = fs.readFileSync(filePath, 'utf8');
        entries = JSON.parse(existingData);
      }

      // Add new entry to the beginning (most recent first)
      entries.unshift(newEntry);

      // Write back to file
      fs.writeFileSync(filePath, JSON.stringify(entries, null, 2));

      return res.status(201).json({ 
        success: true, 
        entry: newEntry,
        message: 'Entry added successfully' 
      });

    } catch (error) {
      console.error('Error adding microblog entry:', error);
      return res.status(500).json({ error: 'Failed to add entry' });
    }
  }

  // Method not allowed
  return res.status(405).json({ error: 'Method not allowed' });
}