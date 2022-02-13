import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./OwnerHomePage.module.css";
import qr from "../../images/qr-black.jpg";
import { ContractContext } from "../../contexts/ContractContext";
import { useContext } from "react";
import tick from '../../assets/tick.svg';

const OwnerHomePage = () => {
  const navigate = useNavigate();
  const {state, name} = useContext(ContractContext);
  const [orgAdd, setOrgAdd] = useState("");
  const [orgInfo, setOrgInfo] = useState({});

  // const performTest = async () => {
  //   const { accounts, contract } = state;
  //   console.log(accounts);
  //   console.log(contract);
  //   try{
  //     // await contract.methods.set(6).send({ from: accounts[0], gas:100000 });
  //     // const response = await contract.methods.get().call();
  //     await contract.methods.registerEduOrg("0x31c231479858D7674605052b01e366c62345A90D",
  //     "my gov", "122", "mumbai","asdf", "asdf@gmail.com").send({ from: accounts[0], gas:300000 });
  //     await contract.methods.verifyEduOrg("0x31c231479858D7674605052b01e366c62345A90D").send({ from: accounts[0], gas:200000 });
  //     const res3 = await contract.methods.registerPerson("0xEbBF03aEF62E3d371A1943c6Ed28f9dF26C7580d", "ravi", "male", "123456789").send({ from: accounts[0] });
  //     const res4 = await contract.methods.addPersonDoc("0xEbBF03aEF62E3d371A1943c6Ed28f9dF26C7580d", "0x31c231479858D7674605052b01e366c62345A90D", "some hash", "descccc").send({ from: accounts[0] });
  //     const res5 = await contract.methods.getPerson("0xEbBF03aEF62E3d371A1943c6Ed28f9dF26C7580d").call();
  //     // alert(response)
  //     console.log(res5)
  //     console.log("Done")
  //   }catch(e){
  //     console.log(e)
  //   }
  // }

  const searchOrg = async () => {
    const { accounts, contract } = state;
    try{
        const res = await contract.methods.getOrg(`${orgAdd}`).call();
        setOrgInfo(res);
        console.log(res);
    }catch(e){
        console.log(e)
    }
  }

  const handleVerify = async () => {
    const { accounts, contract } = state;
    try{
        await contract.methods.verifyOrg(`${orgAdd}`).send({ from: accounts[0], gas:300000 });
        searchOrg();
        console.log("Done")
    }catch(e){
        console.log(e)
    }
  }

  const handleUnverify = async () => {
    const { accounts, contract } = state;
    try{
        await contract.methods.unverifyOrg(`${orgAdd}`).send({ from: accounts[0], gas:300000 });
        searchOrg();
        console.log("Done")
    }catch(e){
        console.log(e)
    }
  }

  return (
    <div className={styles.ownerHomePageContainer}>
        <div className={styles.ownerHomeContentContainer}>
            <div className={styles.heading}>Welcome Owner</div>
            <div className={styles.registrationForm}>
                <div className={styles.inputGroup}>
                    <span className={styles.inputLabel}>Verify Org</span>
                    <input value={orgAdd} onChange={(e) => {setOrgAdd(e.target.value)}} className={`${styles.customInput}`} type="text" placeholder={"Eth Address"} />
                </div>
                <div></div>
                <div className={styles.inputGroup}>
                    <button onClick={searchOrg} className={styles.searchBtn}>SEARCH</button>
                </div>
            </div>
            {orgInfo.name && orgInfo.name !== "" ? <div className={styles.orgDetailsContainer}>
              <div className={styles.orgDetailNameContainer}>
                  <span className={styles.orgDetailName}>{orgInfo.name ? orgInfo.name : "Loading..."}</span>
                  <div className={styles.verifyIconContainer}>
                      {(orgInfo.isVerified && orgInfo.isVerified == true) ? <img className={styles.verifyIcon} src={tick}/> : <></> }
                  </div>
              </div>
              <span className={styles.orgDetailAbout}>{orgInfo.about}</span>
              <span className={styles.orgDetailSubDetail}>Location: {orgInfo.location}</span>
              <span className={styles.orgDetailSubDetail}>Email: {orgInfo.email}</span>
              <span className={styles.orgDetailSubDetail}>Website: {orgInfo.org_website_link}</span>
              <span className={styles.orgDetailSubDetail}>Address: {orgInfo.phyAdd}</span>
              {
                (orgInfo.isVerified !== undefined && orgInfo.isVerified === true) ? <button onClick={handleUnverify} className={styles.verifyBtn}>Un-verify</button> : <button onClick={handleVerify} className={styles.verifyBtn}>Verify</button>
              }
            </div> : <></>}
        </div>
        
    </div>
  );
};

export default OwnerHomePage;
