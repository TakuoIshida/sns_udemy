
import React from 'react'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles'
import indigo from '@material-ui/core/colors/indigo'
import './App.css';
import Navbar from './components/Navbar';
import ApiContextProvider from './context/ApiContext'

const theme = createMuiTheme({
  parette: {
    primary: indigo,
    secondary: {
      main: '#f44336'
    },
  },
  typography: {
    fontFamily: 'Comic Neue',
  }
})

function App() {
  return (
    // ApiContextProviderで囲まれた範囲はApiContextで定義しているvalue={{}}が渡されるようになっている。
    // ただし、divタグの中身についてはprops.childrenで渡される
    // これで、コンポネントでも、divタグでも、propsのバケツリレーが行わずに、props.○○で取得できるようになる
    <ApiContextProvider>
      <MuiThemeProvider theme={theme}>
        <Navbar />
      </MuiThemeProvider>
    </ApiContextProvider>
  );
}

export default App;
