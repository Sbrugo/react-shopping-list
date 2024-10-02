import "./App.css";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  const API_URL = 'http://localhost:3500/items'
  
  return (
    <>
      <Header header={"Header"} />
      <Content />
      <Footer />
    </>
  );
}

export default App;
