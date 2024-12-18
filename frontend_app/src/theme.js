const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: '#4285F4', // Google Blue
    },
    secondary: {
      main: '#DB4437', // Google Red
    },
    success: {
      main: '#0F9D58', // Google Green
    },
    warning: {
      main: '#F4B400', // Google Yellow
    },
    background: {
      default: mode === 'light' ? '#F5F5F5' : '#121212',
      paper: mode === 'light' ? '#FFFFFF' : '#1E1E1E',
    },
    text: {
      primary: mode === 'light' ? '#000000' : '#FFFFFF',
      secondary: mode === 'light' ? '#555555' : '#AAAAAA',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default getDesignTokens;
