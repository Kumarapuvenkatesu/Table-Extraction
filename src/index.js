import React,{ useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeContext} from "../src/components/ThemeContext/ThemeContext";



// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );



const CustomeThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(false)
  const toggleTheme = () => {
    setTheme((pt) => !pt)
  }
  const themeMode = createTheme({
    palette: {
      mode: theme ? 'dark' : 'light',
      primary: {
        main: '#FF5000'
      },
      secondary: {
        main: '#E5E5E5',
        contrastText: 'black'
      },
      text: {
        secondary: 'red'
      },
      // components: {
      //   MuiList: {
      //     styleOverrides: {
      //       root: {
      //         padding: 0
      //       }
      //     }
      //   },
      //   MuiInputLabel: {
      //     styleOverrides: {
      //       root: {
      //         color: "inherit !important",
      //       },
      //     },
      //   },
      //   MuiInputBase: {
      //     styleOverrides: {
      //       root: {
      //         backgroundColor: !theme ? '#fff' : ''
      //       }
      //     }
      //   },
  
      // }
      
    },
  
  });

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={themeMode}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};


 const root = ReactDOM.createRoot(document.getElementById('root'));
 root.render(
   <CustomeThemeProvider>
<CssBaseline />
     <App />
    </CustomeThemeProvider>
 );
