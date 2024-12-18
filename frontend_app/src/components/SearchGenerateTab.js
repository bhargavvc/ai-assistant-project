import React, { useState } from 'react';
import { Box, Button, TextField, Typography, CircularProgress, Tooltip } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';


const apiUrl = process.env.REACT_APP_BACKEND_URL;


const SearchGenerateTab = () => {
  const [input, setInput] = useState('');
  const [content, setContent] = useState('');
  const [grounding, setGrounding] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearchGenerate = async () => {
    if (!input.trim()) {
      alert('Please enter a query.');
      return;
    }

    setLoading(true);
    setContent('');
    setGrounding('');

    try {
      const response = await fetch(`${apiUrl}/search-generate`, { // Use the apiUrl variable
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input }),
      });

      const data = await response.json();

      if (response.ok) {
        setContent(data.content);
        setGrounding(data.grounding || '');
      } else {
        alert(data.error || 'Failed to generate content with search.');
      }
    } catch (error) {
      console.error('Search Generate Content Error:', error);
      alert('Failed to generate content with search.');
    }

    setLoading(false);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Search as a Tool
      </Typography>
      <Typography variant="body2" gutterBottom>
        The model can decide when to use Google Search to improve accuracy and recency of its answers. Enter a query and see if the model grounds its response.
      </Typography>
      <TextField
        fullWidth
        label="Enter your query"
        multiline
        rows={4}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        variant="outlined"
        margin="normal"
      />
      <Tooltip title="Generate content with search integration">
        <Button variant="contained" color="primary" onClick={handleSearchGenerate} disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Generate with Search'}
        </Button>
      </Tooltip>
      {(content || grounding) && (
        <Box mt={4} p={2} bgcolor="#FFFFFF" borderRadius="8px" boxShadow={2}>
          {content && (
            <>
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
            </>
          )}
          {grounding && (
            <>
              <Typography variant="h6" mt={2}>
                Grounding Metadata (Web Content):
              </Typography>
              <ReactMarkdown
                children={grounding}
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
            </>
          )}
        </Box>
      )}
    </Box>
  );
};

export default SearchGenerateTab;
