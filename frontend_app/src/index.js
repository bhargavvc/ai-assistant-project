// import React from 'react';
// import ReactDOM from 'react-dom/client'; // Updated import
// import App from './App';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import getDesignTokens from './theme';
// import { useState } from 'react';

// function Root() {
//   const [mode, setMode] = useState('light');
//   const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <App mode={mode} setMode={setMode} />
//     </ThemeProvider>
//   );
// }

// const container = document.getElementById('root');
// const root = ReactDOM.createRoot(container); // Use createRoot
// root.render(
//   <React.StrictMode>
//     <Root />
//   </React.StrictMode>
// );


// import React from 'react';
// import ReactDOM from 'react-dom/client'; // Updated import
// import App from './App';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import getDesignTokens from './theme';
// import { useState } from 'react';

// function Root() {
//   const [mode, setMode] = useState('light');
//   const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <App mode={mode} setMode={setMode} />
//     </ThemeProvider>
//   );
// }

// const container = document.getElementById('root');
// const root = ReactDOM.createRoot(container); // Use createRoot
// root.render(
//   <React.StrictMode>
//     <Root />
//   </React.StrictMode>
// );


import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import getDesignTokens from './theme';
import { useState } from 'react';

function Root() {
  const [mode, setMode] = useState('light');
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App mode={mode} setMode={setMode} />
    </ThemeProvider>
  );
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
