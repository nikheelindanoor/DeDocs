import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import qr from "../../images/qr-black.jpg";
import { ContractContext } from "../../contexts/ContractContext";
import { useContext } from "react";
import PersonHome from "../PersonHome/PersonHome";
import OrgHome from "../OrgHome/OrgHome";
import OwnerHomePage from "../OwnerHomePage/OwnerHomePage";

const Home = () => {
  const navigate = useNavigate();
  const {state, name} = useContext(ContractContext);
  const [userRole, setUserRole] = useState(0);

  const checkRole = async() => {
    const { accounts, contract } = state;
    console.log(accounts);
    console.log(contract);
    try{
      const res = await contract.methods.checkRole(`${accounts[0]}`).call();
      setUserRole(res);
      console.log(res);
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    checkRole();
  }, [state])

  // useEffect(async() => {
  //   const { accounts, contract } = state;
  //   if(contract){
  //     const orgAd = "0xf08E19593b4e314008A77d0257240ae2Fc0eED18"
  //     // await contract.methods.registerEduOrg(orgAd,
  //     // "my gov", "122", "mumbai","asdf", "asdf@gmail.com").send({ from: accounts[0], gas:300000 });
  //     // await contract.methods.verifyEduOrg(orgAd).send({ from: accounts[0], gas:200000 });
  //     // const res4 = await contract.methods.addPersonDoc(`${accounts[0]}`, orgAd, "some hash", "descccc").send({ from: accounts[0] });
  //     // const check = await contract.methods.verified_address_edu_map(orgAd).call();
  //     const res5 = await contract.methods.getPerson(`${accounts[0]}`).call();
  //     console.log(res5);
  //     setPersonInfo(res5);
  //   }
  // }, [state])

  const getPage = () => {
    if(userRole == 0){return <div>No user found, register first
      <button onClick={() => {navigate("/register")}}>Register</button>
    </div>}
    else if(userRole == 1){return <OwnerHomePage />}
    else if(userRole == 2){return <PersonHome />}
    else if(userRole >= 3 && userRole <= 5){ return <OrgHome />}
    else { return <div>Page not found</div>}
  }

  return (
    <div>
      {getPage()}
    </div>
  );
};

export default Home;
