import Header from "./components/Header";
import {CountryProvider} from "./context/CountryInfo";
function App() {
  return (
    <div className="App">
      <CountryProvider>
      <Header/>
      </CountryProvider>
    </div>
  );
}

export default App;
