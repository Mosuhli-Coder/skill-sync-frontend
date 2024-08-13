import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import SkillManagement from "./components/SkillManagement";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />

        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/skill-management" element={<SkillManagement />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
