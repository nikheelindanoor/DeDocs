import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./OwnerHomePage.module.css";
import qr from "../../images/qr-black.jpg";
import { ContractContext } from "../../contexts/ContractContext";
import { useContext } from "react";

const OwnerHomePage = () => {
  const navigate = useNavigate();
  const {state, name} = useContext(ContractContext);
  const [orgAdd, setOrgAdd] = useState("");

  const performTest = async () => {
    const { accounts, contract } = state;
    console.log(accounts);
    console.log(contract);
    try{
      // await contract.methods.set(6).send({ from: accounts[0], gas:100000 });
      // const response = await contract.methods.get().call();
      await contract.methods.registerEduOrg("0x31c231479858D7674605052b01e366c62345A90D",
      "my gov", "122", "mumbai","asdf", "asdf@gmail.com").send({ from: accounts[0], gas:300000 });
      await contract.methods.verifyEduOrg("0x31c231479858D7674605052b01e366c62345A90D").send({ from: accounts[0], gas:200000 });
      const res3 = await contract.methods.registerPerson("0xEbBF03aEF62E3d371A1943c6Ed28f9dF26C7580d", "ravi", "male", "123456789").send({ from: accounts[0] });
      const res4 = await contract.methods.addPersonDoc("0xEbBF03aEF62E3d371A1943c6Ed28f9dF26C7580d", "0x31c231479858D7674605052b01e366c62345A90D", "some hash", "descccc").send({ from: accounts[0] });
      const res5 = await contract.methods.getPerson("0xEbBF03aEF62E3d371A1943c6Ed28f9dF26C7580d").call();
      // alert(response)
      console.log(res5)
      console.log("Done")
    }catch(e){
      console.log(e)
    }
  }

  const handleVerify = async () => {
    const { accounts, contract } = state;
    try{
        // await contract.methods.set(6).send({ from: accounts[0], gas:100000 });
        // const response = await contract.methods.get().call();
        await contract.methods.verifyEduOrg(`${orgAdd}`).send({ from: accounts[0], gas:300000 });
        
        console.log("Done")
    }catch(e){
        console.log(e)
    }
  }

//   useEffect(async() => {
//     const { accounts, contract } = state;
//     if(contract){
//       const orgAd = "0xf08E19593b4e314008A77d0257240ae2Fc0eED18"
//       // await contract.methods.registerEduOrg(orgAd,
//       // "my gov", "122", "mumbai","asdf", "asdf@gmail.com").send({ from: accounts[0], gas:300000 });
//       // await contract.methods.verifyEduOrg(orgAd).send({ from: accounts[0], gas:200000 });
//       // const res4 = await contract.methods.addPersonDoc(`${accounts[0]}`, orgAd, "some hash", "descccc").send({ from: accounts[0] });
//       // const check = await contract.methods.verified_address_edu_map(orgAd).call();
//       const res5 = await contract.methods.getPerson(`${accounts[0]}`).call();
//       console.log(res5);
//     //   setPersonInfo(res5);
//     }
//   }, [state])

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
                    <button onClick={handleVerify} className={styles.verifyBtn}>VERIFY</button>
                </div>
            </div>
        </div>
        
    </div>
  );
};

export default OwnerHomePage;
