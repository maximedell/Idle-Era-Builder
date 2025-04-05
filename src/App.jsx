import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GameLoop } from '@core/GameLoop';
import '@fontsource/roboto';
import './App.css';
import Index from '@pages/Index';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <GameLoop />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
