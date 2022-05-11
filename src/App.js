import React  from 'react';
import Header from './components/Header';

import { BrowserRouter,  Routes,  Route } from "react-router-dom";

import Productos from './components/Productos';
import EditarProducto from './components/EditarProducto';
import NuevoProducto from './components/NuevoProducto';

// Redux
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
  <BrowserRouter>
    <Provider store={ store }>
      <Header/>
      <Routes>
        <Route path="/" element={<Productos/>}/>
        <Route path='/productos/nuevo' element={<NuevoProducto/>} />
        <Route path='/productos/editar/:id' element={<EditarProducto />} />
      </Routes>
    </Provider>
    </BrowserRouter>
  );
}

export default App;
