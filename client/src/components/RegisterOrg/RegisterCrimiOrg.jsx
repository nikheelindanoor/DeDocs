import React, { useState, useEffect, useContext, useRef } from "react";
import styles from "./RegisterOrg.module.css";
import crime from "../../images/crime2.png";
import { ContractContext } from "../../contexts/ContractContext";
import { useNavigate } from 'react-router-dom';
import UploadIcon from "@mui/icons-material/Upload";
import ipfs from "../../ipfs";


const RegisterCrimiOrg = () => {

  const {state, name} = useContext(ContractContext);
  const navigate = useNavigate();
  const uploadImageInput = useRef(null);
  const [fileName, setFileName] = useState("Select file");
  const [imageFile, setImageFile] = useState(null);
  const [orgName, setOrgName] = useState("");
  const [contactNum, setContactNum] = useState("");
  const [orgLocation, setOrgLocation] = useState("");
  const [orgEmail, setOrgEmail] = useState("");
  const [orgPhyAddress, setOrgPhyAddress] = useState("");
  const [orgAbout, setOrgAbout] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUploadImage = () => {
    uploadImageInput.current.click();
  };

  const handleFileChange = (e) => {
      setFileName(e.target.files[0].name);
      setImageFile(e.target.files[0]);
  }

  const handleRegister = async () => {
    if(!isChecked || orgName === "" || contactNum === "" || orgLocation === "" || orgEmail === "" || orgPhyAddress === "" || orgAbout === ""){
      alert("Enter all details first");
      return;
    } 
    setLoading(true);
    try{
        const { accounts, contract } = state;
        console.log(accounts);

        const reader = new window.FileReader();
          reader.readAsArrayBuffer(imageFile);
          reader.onloadend= () => {
              const imagebuf = Buffer(reader.result)
              console.log(imagebuf)
              ipfs.files.add(imagebuf, async (err, result) => {
                  if(err){
                      console.log(err);
                      return;
                  }
                  console.log(result);
                  await contract.methods.registerOrg(`${accounts[0]}`, orgName, 1, `${result[0].hash}`, contactNum, orgLocation, orgAbout, orgPhyAddress, orgEmail, orgEmail).send({ from: accounts[0] });
                  const res5 = await contract.methods.getOrg(`${accounts[0]}`).call();
                  console.log(res5);
                  navigate("/");
              })
          }

        
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
          <span className={styles.textContent}>Register as a Criminal Organization</span>
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
                placeholder={"0000000000"}
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
            <div className={styles.inputGroup}>
              <span className={styles.inputLabel}>Upload Organization Logo</span>
              <button onClick={handleUploadImage} className={styles.uploadFileBtn}>
                  <UploadIcon sx={{marginRight: 1}}/>
                  {fileName}
              </button>
              <input onChange={handleFileChange} ref={uploadImageInput} accept="image/*" className={`${styles.customInput} ${styles.fileUploadInput}`} type="file" placeholder={""} />
            </div>
            <div
              className={`${styles.inputGroup} ${styles.rowInputGroup} ${styles.spanInputGroup}`}
            >
              <input
                onChange={(e) => { setIsChecked(e.target.checked); }} 
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
          <span className={styles.heading}>DeDocs</span>
          <img className={styles.crimeImage} src={crime} />
          <span className={styles.textContent}>
          1) Enter details like organization name, Contact number etc.<br/>
          2) Upload a logo OR significant picture of your organization. <br/>
          3) Check in to adhere to all the terms and conditions.<br/> 
          4) And you are done! Just click register!<br/>
          </span>
          <div className={styles.endSeperator}></div>
        </div>
      </div>
    );
};

export default RegisterCrimiOrg;
