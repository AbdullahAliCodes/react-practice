import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import Header from "./components/layout/Header";

const App = () => {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          {/* Redirect Users to Home page from "/" */}
          <Route path="/" element={<Navigate to="/home" replace />}></Route>
          <Route path="/home" element={<Home />}>
            <Route path="username" element={<p>Welcome username!</p>}></Route>
          </Route>
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/sign-in"></Route>
        </Routes>
      </main>
    </div>
  );
};

export default App;
