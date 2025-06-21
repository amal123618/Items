import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AddItem from './components/AddItem';
import ViewItems from './components/ViewItems';

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
      <Link className="navbar-brand fw-bold text-white" to="/">Shop</Link>
      <div className="navbar-nav ms-auto">
        <Link className="nav-link text-white" to="/">View Items</Link>
        <Link className="nav-link text-white" to="/add">Add Item</Link>
      </div>
    </nav>
      <Routes>
        <Route path="/" element={<ViewItems />} />
        <Route path="/add" element={<AddItem />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
