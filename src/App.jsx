import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Error from "./pages/Error";
import Sidebar from "./components/Sidebar"; // Import Sidebar component

export default function App() {
  return (
    <Router>
      <Header />
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar />
        <div style={{ marginLeft: 100, width: "100%" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/*" element={<Error />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  );
}
