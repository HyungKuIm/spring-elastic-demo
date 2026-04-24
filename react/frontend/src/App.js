import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import ListMovie from './components/ListMovie';
import AddMovie from './components/AddMovie';
import DetailMovie from './components/DetailMovie';

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ListMovie/>} />
          <Route path='/page/:page' element={<ListMovie/>} />
          <Route path='/addMovie' element={<AddMovie/>} />
          <Route path='/detail/:id/:page' element={<DetailMovie/>} />
        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
