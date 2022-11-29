import "./App.css";
import MainPage from "./components/MainPage";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";

const getLibrary = (provider: any) => {
  return new Web3Provider(provider);
};

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <MainPage />
    </Web3ReactProvider>
  );
}

export default App;
