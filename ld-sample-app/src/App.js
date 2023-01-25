
import './App.css';
import { withLDProvider } from 'launchdarkly-react-client-sdk';
import Header from "./Header";
import Footer from "./Footer";

function App(props) {
  console.log("___________________ inside App.js");
  return (
    <div className="App">
      <Header ldUserCtx={props}/>
      <Footer ldUserCtx={props}/>
    </div>
  );
}

export default App;