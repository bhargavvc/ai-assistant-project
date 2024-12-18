import React, { useState } from 'react';
import { Box, Button, TextField, Typography, CircularProgress, Tooltip } from '@mui/material';
const apiUrl = process.env.REACT_APP_BACKEND_URL;

const ImageGenerateTab = () => {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageGenerate = async () => {
    if (!input.trim()) {
      alert('Please enter a description for the image.');
      return;
    }

    setLoading(true);
    setImageUrl('');

    try {
      const response = await fetch(`${apiUrl}/generate-image`, { // Use the apiUrl variable

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input }),
      });

      const data = await response.json();

      if (response.ok) {
        setImageUrl(data.image_url);
      } else {
        alert(data.error || 'Failed to generate image.');
      }
    } catch (error) {
      console.error('Generate Image Error:', error);
      alert('Failed to generate image.');
    }

    setLoading(false);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Image Generation (Experimental)
      </Typography>
      <Typography variant="body2" gutterBottom>
        Provide a description and Gemini will attempt to generate an image. (Requires allowlist access)
      </Typography>
      <TextField
        fullWidth
        label="Describe the image you want"
        multiline
        rows={4}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        variant="outlined"
        margin="normal"
      />
      <Tooltip title="Generate image based on your description">
        <Button variant="contained" color="primary" onClick={handleImageGenerate} disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Generate Image'}
        </Button>
      </Tooltip>
      {imageUrl && (
        <Box mt={4} p={2} bgcolor="#FFFFFF" borderRadius="8px" boxShadow={2} textAlign="center">
          <Typography variant="h6">Generated Image:</Typography>
          {imageUrl === "No image_url field." ? (
            <Typography color="error">No image generated. Try another prompt or check your access.</Typography>
          ) : (
            <img src={imageUrl} alt="Generated" style={{ maxWidth: '100%', borderRadius: '8px', marginTop: '10px' }} />
          )}
        </Box>
      )}
    </Box>
  );
};

export default ImageGenerateTab;
