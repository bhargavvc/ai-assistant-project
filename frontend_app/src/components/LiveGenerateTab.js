import React, { useState } from 'react';
import { Box, Button, TextField, Typography, CircularProgress, Tooltip } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';


const apiUrl = process.env.REACT_APP_BACKEND_URL;

const LiveGenerateTab = () => {
  const [input, setInput] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLiveGenerate = async () => {
    if (!input.trim()) {
      alert('Please enter a prompt.');
      return;
    }

    setLoading(true);
    setContent('');

    try {
      const response = await fetch(`${apiUrl}/live-generate`, { // Use the apiUrl variable
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input }),
      });

      const data = await response.json();

      if (response.ok) {
        setContent(data.content);
      } else {
        alert(data.error || 'Failed to generate live content.');
      }
    } catch (error) {
      console.error('Live Generate Content Error:', error);
      alert('Failed to generate live content.');
    }

    setLoading(false);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Live Generation (Multimodal Live API)
      </Typography>
      <Typography variant="body2" gutterBottom>
        Experience low-latency, bidirectional interactions. Enter a prompt and click "Generate Live" to simulate a live session response.
      </Typography>
      <TextField
        fullWidth
        label="Enter your prompt"
        multiline
        rows={4}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        variant="outlined"
        margin="normal"
      />
      <Tooltip title="Generate live response based on your input">
        <Button variant="contained" color="primary" onClick={handleLiveGenerate} disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Generate Live'}
        </Button>
      </Tooltip>
      {content && (
        <Box mt={4} p={2} bgcolor="#FFFFFF" borderRadius="8px" boxShadow={2}>
          <Typography variant="h6">Live Response:</Typography>
          <ReactMarkdown
            children={content}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={coy}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default LiveGenerateTab;
