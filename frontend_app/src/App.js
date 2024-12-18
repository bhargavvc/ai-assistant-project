import React, { useState } from 'react';
import { AppBar, Tabs, Tab, Box, Typography, Container } from '@mui/material';
import GenerateTab from './components/GenerateTab';
import SearchGenerateTab from './components/SearchGenerateTab';
import LiveGenerateTab from './components/LiveGenerateTab';
import ImageGenerateTab from './components/ImageGenerateTab';
import HelpIcon from '@mui/icons-material/Help';
import BuildIcon from '@mui/icons-material/Build';
import SearchIcon from '@mui/icons-material/Search';
import ImageIcon from '@mui/icons-material/Image';
import { Helmet } from 'react-helmet';
import './App.css';

// TabPanel Component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
      style={{ width: '100%' }}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function App({ mode, setMode }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="content-wrapper">
        <Helmet>
          <title>Personalized Learning Assistant</title>
          <meta
            name="description"
            content="An assistant powered by Gemini 2.0 Flash Experimental API to help you learn effectively."
          />
        </Helmet>

        <Container maxWidth="md" style={{ marginTop: '20px', marginBottom: '40px' }}>
          {/* Suggestion Box with Background Image */}
          <div className="suggestion-box">
  <div className="suggestion-overlay"></div> {/* Overlay for reduced transparency */}

  <div className="suggestion-content">
    <AppBar
      position="static"
      color="default"
      sx={{
        borderRadius: '8px',
        boxShadow: 'none',
        background: 'transparent', /* Transparent AppBar */
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="Gemini 2.0 Tabs"
      >
        <Tab
          label="Text Generation"
          icon={<BuildIcon />}
          iconPosition="start"
          sx={{ color: '#4285F4' }} // Google Blue
        />
        <Tab
          label="Search as a Tool"
          icon={<SearchIcon />}
          iconPosition="start"
          sx={{ color: '#DB4437' }} // Google Red
        />
        <Tab
          label="Live Generation"
          icon={<HelpIcon />}
          iconPosition="start"
          sx={{ color: '#F4B400' }} // Google Yellow
        />
        <Tab
          label="Image Generation"
          icon={<ImageIcon />}
          iconPosition="start"
          sx={{ color: '#0F9D58' }} // Google Green
          disabled
        />
      </Tabs>
    </AppBar>
  </div>
</div>


          {/* Tabs Content */}
          <TabPanel value={value} index={0}>
            <GenerateTab />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <SearchGenerateTab />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <LiveGenerateTab />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <ImageGenerateTab />
          </TabPanel>

          {/* Footer */}
          <Box mt={5} textAlign="center">
            <Typography variant="body2" color="textSecondary">
              Powered by <strong>Gemini 2.0 Flash Experimental</strong>
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Explore text generation, live sessions, search integration, and image generation features.
            </Typography>
          </Box>
        </Container>
      </div>
    </>
  );
}

export default App;
