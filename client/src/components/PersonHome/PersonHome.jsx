import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PersonHome.module.css";
import qr from "../../images/qr-black.jpg";
import { ContractContext } from "../../contexts/ContractContext";
import { useContext } from "react";

const PersonHome = () => {
  const navigate = useNavigate();
  const {state, name} = useContext(ContractContext);
  const [personInfo, setPersonInfo] = useState({});

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

  useEffect(async() => {
    const { accounts, contract } = state;
    if(contract){
      const orgAd = "0xf08E19593b4e314008A77d0257240ae2Fc0eED18"
      // await contract.methods.registerEduOrg(orgAd,
      // "my gov", "122", "mumbai","asdf", "asdf@gmail.com").send({ from: accounts[0], gas:300000 });
      // await contract.methods.verifyEduOrg(orgAd).send({ from: accounts[0], gas:200000 });
      // const res4 = await contract.methods.addPersonDoc(`${accounts[0]}`, orgAd, "some hash", "descccc").send({ from: accounts[0] });
      // const check = await contract.methods.verified_address_edu_map(orgAd).call();
      const res5 = await contract.methods.getPerson(`${accounts[0]}`).call();
      console.log(res5);
      setPersonInfo(res5);
    }
  }, [state])

  return (
    <>
      {" "}
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Merriweather:wght@300&family=Roboto:wght@100&display=swap');
      </style>
      <div className={styles.topBar}>
        <div>
          <h3 className={`${styles.mainHead} ${styles.projectName}`}>Project Magellanic</h3>
        </div>
        <div>
          <button className={styles.registerBtn}
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </button>
        </div>
      </div>
      <div className={styles.line}></div>
      <div className={styles.allContent}>
        <div className={styles.mainContent}>
          <div className={styles.mainDetailsContent}>
            <p className={styles.mainHead}>Your Profile</p>
            <div className={styles.myDetails}>
              <div className={styles.text}>
                <p>Name</p>
                <h3>{(personInfo.name) ? personInfo.name : "Loading..."}</h3>
              </div>
              <div className={`${styles.divide} ${styles.text}`}>
                <div className={styles.left}>
                  <p>Aadhar Number</p>
                  <h3>{(personInfo.AadharNo) ? personInfo.AadharNo : "000000000"}</h3>
                </div>
                <div className={styles.right}>
                  <p>Contact Number</p>
                  <h3>+91 8779513452</h3>
                </div>
              </div>
              <div className={styles.text}>
                <p>Your Digital Address</p>
                <h3>350058674758350058674758350058</h3>
              </div>
            </div>
          </div>
          <div className={styles.QRBlock}>
            <img className={styles.QRImage} src={qr} />
          </div>
        </div>
        <div>
          <h3 className={styles.head}>Education Details</h3>
          <div className={styles.eduDetails}>
            {personInfo.Educations ? 
              personInfo.Educations.map((edu, index) => {
                return <div key={index} className={`${styles.text} ${styles.eduOrg}`}>
                  <h3>{edu.org_name}</h3>
                </div>
              })
              : <></>
            }
            {/* <div className={`${styles.text} ${styles.eduOrg}`}>
              <h3>Veermata Jijabai Technological Institute</h3>
            </div>
            <div className={`${styles.text} ${styles.eduOrg}`}>
              <h3>St. Joseph's Convent Sr. Sec. School</h3>
            </div> */}
          </div>
        </div>
        <div>
          <h3 className={styles.head}>Medical Details</h3>
          <div className={styles.mediDetails}>
            <div className={`${styles.text} ${styles.mediOrg}`}>
              <h3>
                King Edward (VII) Memorial Hospital and Seth Gordhandas
                Sunderdas Medical College
              </h3>
            </div>
            <div className={`${styles.text} ${styles.mediOrg}`}>
              <h3>Aditya Birla Memorial Hospital</h3>
            </div>
          </div>
        </div>
        <div>
          <h3 className={styles.head}>Criminal Details</h3>
          <div className={styles.crimiDetails}>
            <div className={`${styles.text} ${styles.crimiOrg}`}>
              <h3>Bombay High Court Aurangabad Bench</h3>
            </div>
            <div className={`${styles.text} ${styles.crimiOrg}`}>
              <h3>Colaba Police Station</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonHome;
