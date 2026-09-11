import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Problems from './pages/Problems';
import Solve from './pages/Solve';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/"                 element={<Dashboard />} />
          <Route path="/problems"         element={<Problems />} />
          <Route path="/solve/:problemId" element={<Solve />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
