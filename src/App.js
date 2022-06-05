import './App.css';
import { ThemeProvider } from './context/ThemeContext';
import { GlobalContextProvider } from './context/GlobalContext';
import { Routes, Route } from 'react-router-dom';
import './i18n';
import Home from './pages/Home';
import List from './pages/List';

function App() {
  return (
    <GlobalContextProvider>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list/:id" element={<List />} />
        </Routes>
      </ThemeProvider>
    </GlobalContextProvider>
  );
}

export default App;
