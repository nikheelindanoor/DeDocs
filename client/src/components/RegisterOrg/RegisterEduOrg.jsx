import React, { useState, useEffect, useContext } from "react";
import styles from "./RegisterOrg.module.css";
import edu from "../../images/edu.png";
import { ContractContext } from "../../contexts/ContractContext";
import { useNavigate } from 'react-router-dom';

const RegisterEduOrg = () => {

  const {state, name} = useContext(ContractContext);
  const navigate = useNavigate();
  const [orgName, setOrgName] = useState("");
  const [contactNum, setContactNum] = useState("");
  const [orgLocation, setOrgLocation] = useState("");
  const [orgEmail, setOrgEmail] = useState("");
  const [orgPhyAddress, setOrgPhyAddress] = useState("");
  const [orgAbout, setOrgAbout] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if(orgName === "" || contactNum === "" || orgLocation === "" || orgEmail === "" || orgPhyAddress === "" || orgAbout === ""){
      alert("Enter all details first");
      return;
    } 
    setLoading(true);
    try{
        const { accounts, contract } = state;
        console.log(accounts);
        await contract.methods.registerEduOrg(`${accounts[0]}`, orgName, contactNum, orgLocation, orgAbout, orgEmail).send({ from: accounts[0] });
        const res5 = await contract.methods.address_edu_map(`${accounts[0]}`).call();
        console.log(res5);
        // navigate("/");
    }catch(err){
        console.log(err);
    }
    setLoading(false);
  }

  return (
    <div className={styles.registerOrgPageContainer}>
      <div className={styles.registerContentContainer}>
        <span className={styles.heading}>
          Your Data.
          <br />
          Our Responsibility.
        </span>
        <span className={styles.textContent}>Register as an Educational Organization</span>
        <div className={styles.registrationForm}>
          <div className={styles.inputGroup}>
            <span className={styles.inputLabel}>Organization Name</span>
            <input
              value={orgName}
              onChange={(e) => {setOrgName(e.target.value)}}
              className={`${styles.customInput} ${styles.smallInput}`}
              type="text"
              placeholder={"Name"}
            />
          </div>

          <div className={styles.inputGroup}>
            <span className={styles.inputLabel}>Contact Number</span>
            <input
              value={contactNum}
              onChange={(e) => {setContactNum(e.target.value)}}
              className={`${styles.customInput}`}
              type="number"
              pattern="\d*"
              maxlength="12"
              placeholder={"0000-0000-0000-0000"}
            />
          </div>
          <div className={styles.inputGroup}>
            <span className={styles.inputLabel}>Location</span>
            <input
              value={orgLocation}
              onChange={(e) => {setOrgLocation(e.target.value)}}
              className={`${styles.customInput}`}
              type="text"
              placeholder={""}
            />
          </div>
          <div className={styles.inputGroup}>
            <span className={styles.inputLabel}>Email</span>
            <input
              value={orgEmail}
              onChange={(e) => {setOrgEmail(e.target.value)}}
              className={`${styles.customInput}`}
              type="email"
              placeholder={""}
            />
          </div>
          <div className={`${styles.inputGroup} ${styles.spanInputGroup}`}>
            <span className={styles.inputLabel}>Address</span>
            <textarea
              value={orgPhyAddress}
              onChange={(e) => {setOrgPhyAddress(e.target.value)}}
              className={`${styles.customInput} ${styles.addressInput}`}
            />
          </div>
          <div className={`${styles.inputGroup} ${styles.spanInputGroup}`}>
            <span className={styles.inputLabel}>About</span>
            <textarea
              value={orgAbout}
              onChange={(e) => {setOrgAbout(e.target.value)}}
              className={`${styles.customInput} ${styles.addressInput}`}
            />
          </div>
          <div
            className={`${styles.inputGroup} ${styles.rowInputGroup} ${styles.spanInputGroup}`}
          >
            <input
              className={`${styles.customCheckInput}`}
              type="checkbox"
              placeholder={""}
            />
            <span className={styles.inputLabel}>
              I have read all the terms and conditions
            </span>
          </div>
          <div className={styles.inputGroup}>
            <button onClick={handleRegister} className={styles.registerBtn}>REGISTER</button>
          </div>
        </div>
      </div>
      <div className={styles.infoContentContainer}>
        <span className={styles.heading}>Project Magnellanic</span>
        <img className={styles.eduImage} src={edu} />
        <span className={styles.textContent}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id
          metus id urna semper tempus vel ut massa. Maecenas vehicula mollis
          purus non ullamcorper. Aenean facilisis ex eu dolor consequat, sed
          rhoncus enim molestie. Suspendisse quis risus bibendum, egestas nunc
          sit amet, faucibus dolor. Vivamus eget magna arcu.
        </span>
        <div className={styles.endSeperator}></div>
      </div>
    </div>
  );
};

export default RegisterEduOrg;
