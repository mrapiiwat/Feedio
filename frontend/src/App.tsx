import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SchedulePage from "./pages/SchedulePage";
import StatisticsPage from "./pages/StatisticsPage";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <Navbar />

      <main className="flex-1 p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
