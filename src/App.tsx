import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import MensCollection from './components/MensCollection';
import KidsCollection from './components/KidsCollection';
import ProductDetail from './components/ProductDetail';
import ReserveBay from './components/ReserveBay';
import ReserveBayResults from './components/ReserveBayResults';
import Help from './components/Help';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-neutral-900 text-white">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection/men" element={<MensCollection />} />
          <Route path="/collection/women" element={<div className="pt-32 text-center">Women's Collection Coming Soon</div>} />
          <Route path="/collection/kids" element={<KidsCollection />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/reserve" element={<ReserveBay />} />
          <Route path="/reserve/results" element={<ReserveBayResults />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
