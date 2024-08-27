import "./App.css";
import { useNavigate } from "react-router-dom";
import CountryPicker from "../../common/CountryPicker.tsx";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Public Holiday Chain Finder</h1>
      <CountryPicker
        onSelect={(country) => navigate(`/calendar?country=${country}`)}
      />
    </>
  );
}

export default App;
