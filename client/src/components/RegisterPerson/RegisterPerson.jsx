import React, { useState, useEffect, useContext, useRef } from "react";
import styles from "./RegisterPerson.module.css";
import { ContractContext } from "../../contexts/ContractContext";
import { useNavigate } from "react-router-dom";
import UploadIcon from "@mui/icons-material/Upload";
import ipfs from "../../ipfs";
import individual from "../../images/individuals.png";

const RegisterPerson = () => {
  const { state, name } = useContext(ContractContext);
  const navigate = useNavigate();
  const uploadImageInput = useRef(null);
  const [fileName, setFileName] = useState("Select file");
  const [imageFile, setImageFile] = useState(null);
  const [fullName, setFullName] = useState("");
  const [aadharNum, setAadharNum] = useState("");
  const [contactNum, setContactNum] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("Male");
  const [physicalAddress, setPhysicalAddress] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);

    const handleUploadImage = () => {
        uploadImageInput.current.click();
    };

    const handleFileChange = (e) => {
        setFileName(e.target.files[0].name);
        setImageFile(e.target.files[0]);
    }

    const handleGenderChange = (e) =>{
        setGender(e.target.value)
    }

    const handleRegister = async () => {
        if(!isChecked || fileName == "" || fullName === "" || aadharNum === "" || contactNum === "" || gender === "" || physicalAddress === "" || dob == ""){
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
                    await contract.methods.registerPerson(`${accounts[0]}`, result[0].hash, fullName, gender, aadharNum, physicalAddress, dob, contactNum).send({ from: accounts[0] });
                    const res5 = await contract.methods.getPerson(`${accounts[0]}`).call();
                    console.log(res5);
                    navigate("/");
                })
            }

            
        }catch(err){
            console.log(err);
            return;
        }
    };

    return (
        <div className={styles.registerPersonPageContainer}>
            <div className={styles.registerContentContainer}>
                <span className={styles.heading}>Your Data.<br/>Our Responsibility.</span>
                <span className={styles.textContent}>Register as an Individual</span>
                <div className={styles.registrationForm}>
                    <div className={styles.inputGroup}>
                        <span className={styles.inputLabel}>Full Name</span>
                        <input value={fullName} onChange={(e) => {setFullName(e.target.value)}} className={`${styles.customInput} ${styles.smallInput}`} type="text" placeholder={"First Middle Last"} />
                    </div>
                    <div></div>
                    <div className={styles.inputGroup}>
                        <span className={styles.inputLabel}>Aadhar Number</span>
                        <input value={aadharNum} onChange={(e) => {setAadharNum(e.target.value)}} className={`${styles.customInput}`} type="number" pattern="\d*" maxlength="12" placeholder={"0000-0000-0000-0000"} />
                    </div>
                    <div className={styles.inputGroup}>
                        <span className={styles.inputLabel}>Contact Number</span>
                        <input value={contactNum} onChange={(e) => {setContactNum(e.target.value)}} className={`${styles.customInput}`} type="number" placeholder={""} />
                    </div>
                    <div className={styles.inputGroup}>
                        <span className={styles.inputLabel}>Date of Birth</span>
                        <input onChange={(e) => {setDob(e.target.value);}} className={`${styles.customInput}`} type="date" placeholder={""} />
                    </div>
                    <div className={styles.inputGroup}>
                        <span className={styles.inputLabel}>Gender</span>
                        <select value={gender} className={styles.customInput} name="genderInput"
                            onChange={handleGenderChange}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className={`${styles.inputGroup} ${styles.spanInputGroup}`}>
                        <span className={styles.inputLabel}>Address</span>
                        <textarea value={physicalAddress} onChange={(e) => {setPhysicalAddress(e.target.value)}} className={`${styles.customInput} ${styles.addressInput}`}/>
                    </div>
                    <div className={styles.inputGroup}>
                        <span className={styles.inputLabel}>Upload Image Document</span>
                        <button onClick={handleUploadImage} className={styles.uploadFileBtn}>
                            <UploadIcon sx={{marginRight: 1}}/>
                            {fileName}
                        </button>
                        <input onChange={handleFileChange} ref={uploadImageInput} accept="image/*" className={`${styles.customInput} ${styles.fileUploadInput}`} type="file" placeholder={""} />
                    </div>
                    <div className={`${styles.inputGroup} ${styles.rowInputGroup} ${styles.spanInputGroup}`}>
                        <input onChange={(e) => { setIsChecked(e.target.checked); }} className={`${styles.customCheckInput}`} type="checkbox" placeholder={""} />
                        <span className={styles.inputLabel}>I have read all the terms and conditions</span>
                    </div>
                    {loading ? "Loading..." : 
                    <div className={styles.inputGroup}>
                        <button onClick={handleRegister} className={styles.registerBtn}>REGISTER</button>
                    </div>
                    }
                    
                </div>
                
            </div>
            <div className={styles.infoContentContainer}>
                <span className={styles.heading}>Project Magnellanic</span>
                <span className={styles.textContent}>
                1.) Enter your basic details like name, Aadhar number etc<br/>
                2.) Upload your profile picture. <br/>
                3.) Check in to adhere to all the terms and conditions<br/>
                4.) And you are done! Just click submit!!<br/>
                </span>
                <div className={styles.endSeperator}></div>
            </div>
        </div>
    );
}

export default RegisterPerson;
