import React, { useState } from 'react';
import { Box, Button, TextField, Typography, CircularProgress, Tooltip } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { jsPDF } from 'jspdf';


const apiUrl = process.env.REACT_APP_BACKEND_URL;

const GenerateTab = () => {
  const [input, setInput] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) {
      alert('Please enter a topic or preference.');
      console.log('GenerateTab: Input is empty.');
      return;
    }

    console.log('GenerateTab: Starting content generation.');
    setLoading(true);
    setContent('');

    try {
      console.log('GenerateTab: Sending request to backend with input:', input);
      const response = await fetch(`${apiUrl}/generate`, { // Use the apiUrl variable
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input }),
      });

      console.log('GenerateTab: Received response with status:', response.status);
      console.log('GenerateTab: Response headers:', response.headers);

      if (!response.ok) {
        console.log('GenerateTab: Response not ok:', response.statusText);
        const errorData = await response.json();
        console.log('GenerateTab: Error data:', errorData);
        alert(errorData.error || 'Failed to generate content.');
        return;
      }

      const data = await response.json();
      console.log('GenerateTab: Parsed JSON data:', data);

      if (data.content) {
        console.log('GenerateTab: Content received successfully.');
        setContent(data.content);
      } else {
        console.log('GenerateTab: Content missing in response.');
        alert('Failed to generate content.');
      }
    } catch (error) {
      console.error('GenerateTab: Generate Content Error:', error);
      alert('Failed to generate content.');
    }

    setLoading(false);
    console.log('GenerateTab: Content generation process completed.');
  };

  const handleSave = () => {
    if (!content) {
      console.log('GenerateTab: No content to save.');
      return;
    }
    console.log('GenerateTab: Saving content as PDF.');
    const doc = new jsPDF();
    doc.text(content, 10, 10);
    doc.save('generated_content.pdf');
    console.log('GenerateTab: PDF saved successfully.');
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Text Generation
      </Typography>
      <Typography variant="body2" gutterBottom>
        Enter a topic or question and click "Generate" to get a text response from Gemini 2.0.
      </Typography>
      <TextField
        fullWidth
        label="Enter your prompt"
        multiline
        rows={4}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          console.log('GenerateTab: Input changed to:', e.target.value);
        }}
        variant="outlined"
        margin="normal"
      />
      <Tooltip title="Generate text based on your input">
        <Button variant="contained" color="primary" onClick={handleGenerate} disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Generate'}
        </Button>
      </Tooltip>
      {content && (
        <Box mt={4} p={2} bgcolor="#FFFFFF" borderRadius="8px" boxShadow={2}>
          <Typography variant="h6">Generated Content:</Typography>
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
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleSave}
            style={{ marginTop: '10px' }}
          >
            Save as PDF
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default GenerateTab;
