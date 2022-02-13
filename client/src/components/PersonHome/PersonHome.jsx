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

  const handleDocClick = (obj) => {
    navigate("/doc", {state:obj});
  }

  useEffect(async() => {
    const { accounts, contract } = state;
    if(contract){
      const orgAd = "0xf08E19593b4e314008A77d0257240ae2Fc0eED18"
      const res5 = await contract.methods.getPerson(`${accounts[0]}`).call();
      console.log(res5);
      setPersonInfo(res5);
    }
  }, [state])

  return (
    <div className={styles.personHomePageContainer}>
      {" "}
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Merriweather:wght@300&family=Roboto:wght@100&display=swap');
      </style>
      <div className={styles.topBar}>
        <div className={styles.topBarContent}>
          <h3 className={`${styles.mainHead} ${styles.projectName}`}>DeDocs</h3>
        </div>
        {/* <div>
          <button className={styles.registerBtn}
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </button>
        </div> */}
      </div>
      <div className={styles.line}>{" "}</div>
      <div className={styles.allContent}>
        <div className={styles.mainContent}>
          <div className={styles.mainDetailsContent}>
            <p className={styles.mainHead}>Your Profile</p>
            <div className={styles.myDetails}>
              <div className={styles.text}>
                <span>Name</span>
                <span className={styles.personName}>{(personInfo.name) ? personInfo.name : "Loading..."}</span>
              </div>
              <div className={`${styles.divide} ${styles.text}`}>
                <div className={styles.left}>
                  <span>Aadhar Number</span>
                  <span className={styles.personInfoValue}>{(personInfo.AadharNo) ? personInfo.AadharNo : "000000000"}</span>
                </div>
                <div className={styles.right}>
                  <span>Contact Number</span>
                  <span className={styles.personInfoValue}>{(personInfo.contactNo) ? personInfo.contactNo : "000000000"}</span>
                </div>
              </div>
              <div className={styles.text}>
                <span>Your Digital Address</span>
                <span className={styles.personInfoValue}>{(personInfo.ethAddress) ? personInfo.ethAddress : "000000000"}</span>
              </div>
            </div>
          </div>
          <div className={styles.profilePicContainer}>
            <p className={styles.mainHead}>Profile Picture</p>
            <div className={styles.QRBlock}>
              <img className={styles.profilePic} src={`https://ipfs.infura.io/ipfs/${(personInfo.pic_hash !== undefined) ? personInfo.pic_hash : "asdf"}`} />
            </div>
          </div>
          
        </div>
        <div className={styles.personRecordsContainer}>
          <div className={styles.personRecordSection}>
            <h3 className={styles.head}>Education Details</h3>
            <div className={styles.eduDetails}>
              {(personInfo.Edu_data && personInfo.Edu_data.length !== 0) ? 
                personInfo.Edu_data.map((edu, index) => {
                  return <div key={index} onClick={() => {handleDocClick(edu);}} className={`${styles.recordCard} ${styles.eduOrg}`}>
                    <img className={styles.previewImg} src={`https://ipfs.infura.io/ipfs/${edu.Hash}`}/>
                    <span className={styles.recordTitleText}>{edu.doc_title}</span>
                    <span>by {edu.org_name}</span>
                  </div>
                })
                : <div className={styles.noRecordMessage}>No records</div>
              }
            </div>
          </div>
          <div className={styles.personRecordSection}>
            <h3 className={styles.head}>Medical Details</h3>
            <div className={styles.mediDetails}>
              {(personInfo.Med_data && personInfo.Med_data.length !== 0) ? 
                  personInfo.Med_data.map((edu, index) => {
                    return <div key={index} onClick={() => {handleDocClick(edu);}} className={`${styles.recordCard} ${styles.eduOrg}`}>
                      <img className={styles.previewImg} src={`https://ipfs.infura.io/ipfs/${edu.Hash}`}/>
                      <span className={styles.recordTitleText}>{edu.doc_title}</span>
                      <span>by {edu.org_name}</span>
                    </div>
                  })
                  : <div className={styles.noRecordMessage}>No records</div>
              }
            </div>
          </div>
          <div className={styles.personRecordSection}>
            <h3 className={styles.head}>Criminal Details</h3>
            <div className={styles.crimiDetails}>
              {(personInfo.Crime_data && personInfo.Crime_data.length !== 0) ? 
                  personInfo.Crime_data.map((edu, index) => {
                    return <div key={index} onClick={() => {handleDocClick(edu);}} className={`${styles.recordCard} ${styles.eduOrg}`}>
                      <img className={styles.previewImg} src={`https://ipfs.infura.io/ipfs/${edu.Hash}`}/>
                      <span className={styles.recordTitleText}>{edu.doc_title}</span>
                      <span>by {edu.org_name}</span>
                    </div>
                  })
                  : <div className={styles.noRecordMessage}>No records</div>
              }
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default PersonHome;
