const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/ytmp3', (req, res) => {
  const { url } = req.query;

  if (!url || (!url.includes('youtube.com') && !url.includes('youtu.be'))) {
    return res.status(400).json({ error: 'Invalid YouTube URL' });
  }

  const outputDir = path.join(__dirname, 'downloads');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

  const filename = `audio_${Date.now()}.mp3`;
  const outputPath = path.join(outputDir, filename);

  const command = `yt-dlp -x --audio-format mp3 -o "${outputPath}" "${url}"`;

  exec(command, (error) => {
    if (error) {
      return res.status(500).json({ error: 'Conversion failed' });
    }

    res.download(outputPath, filename, () => {
      fs.unlinkSync(outputPath);
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
