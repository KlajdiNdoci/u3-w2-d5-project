import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MyNavbar from "./components/MyNavbar";
import NotFound from "./components/NotFound";
import MainSearch from "./components/MainSearch";
import "bootstrap/dist/css/bootstrap.css";
import MyFooter from "./components/MyFooter";
import Weather from "./components/Weather";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MyNavbar />
        <Routes>
          <Route path="/" element={<MainSearch />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/Weather" element={<Weather />} />
        </Routes>
        <MyFooter />
      </BrowserRouter>
    </div>
  );
}

export default App;
