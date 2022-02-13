import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import getWeb3 from "./getWeb3";
import Aadhar from './contracts/Aadhar.json';
import Home from './components/Home/Home';
import OrgAddRecord from './components/OrgAddRecord/OrgAddRecord';
import OrgHome from './components/OrgHome/OrgHome';
import Register from './components/Register/Register';
import RegisterPerson from './components/RegisterPerson/RegisterPerson';
import RegisterEduOrg from "./components/RegisterOrg/RegisterEduOrg";
import RegisterMediOrg from "./components/RegisterOrg/RegisterMediOrg";
import RegisterCrimiOrg from "./components/RegisterOrg/RegisterCrimiOrg";
import Organizations from "./components/Organizations/Organizations";
import {ContractContext} from './contexts/ContractContext'
import OwnerHomePage from "./components/OwnerHomePage/OwnerHomePage";
import DocInfo from "./components/DocInfo/DocInfo";
import FindDocs from "./components/FindDocs/FindDocs";

const App = () => {
  const [state, setState] = useState({ web3: null, accounts: null, contract: null });

  const [name, setName] = useState("asdf");

  useEffect(() => {
    const setupStuff = async () => {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();
  
        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();
        console.log(accounts)
  
        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = Aadhar.networks[networkId];
        console.log(deployedNetwork)
        const instance = new web3.eth.Contract(
          Aadhar.abi,
          deployedNetwork && deployedNetwork.address,
        );
  
        setState({ web3, accounts, contract: instance });
        // alert(`Connected with ${accounts[0]}`)
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
    }
    setupStuff();
  }, []);

  return (
    
    <BrowserRouter>
      <ContractContext.Provider value={{state, name}}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/register" element={<Register />}/>
          <Route path="/org" element={<OrgHome/>}/>
          <Route path="/addRecord" element={<OrgAddRecord/>}/>
          <Route path="/registerPerson" element={<RegisterPerson />} />
          <Route path="/registerEduOrg" element={<RegisterEduOrg />} />
          <Route path="/registerMediOrg" element={<RegisterMediOrg />} />
          <Route path="/registerCrimiOrg" element={<RegisterCrimiOrg />} />
          <Route path="/organizations" element={<Organizations />} />
          <Route path="/owner" element={<OwnerHomePage />} />
          <Route path="/doc" element={<DocInfo />} />
          <Route path="/finddocs" element={<FindDocs />} />
        </Routes>
       </ContractContext.Provider>
    </BrowserRouter>
    
  );
};

export default App;
