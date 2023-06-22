import React from 'react';
import './App.css';
import { EpubViewer } from './component/EpubViewer';

function App() {
  return (
    <div className="App">
      <EpubViewer url="./1分钟物理套装.epub" />
    </div>
  );
}

export default App;
