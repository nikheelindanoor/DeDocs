import React, {useState, useEffect, useContext} from 'react';
import styles from './RegisterPerson.module.css'
import { ContractContext } from "../../contexts/ContractContext";
import { useNavigate } from 'react-router-dom';


const RegisterPerson = () => {

    const {state, name} = useContext(ContractContext);
    const navigate = useNavigate();
    const [fullName, setFullName] = useState("");
    const [aadharNum, setAadharNum] = useState("");
    const [contactNum, setContactNum] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("Male");
    const [physicalAddress, setPhysicalAddress] = useState("");
    const [loading, setLoading] = useState(false);


    const handleGenderChange = (e) =>{
        setGender(e.value)
    }

    const handleRegister = async () => {
        if(fullName === "" || aadharNum === "" || contactNum === "" || gender === "" || physicalAddress === ""){
            alert("Enter all details first");
            return;
        }
        setLoading(true);
        try{
            const { accounts, contract } = state;
            console.log(accounts);
            await contract.methods.registerPerson(`${accounts[0]}`, fullName, gender, aadharNum).send({ from: accounts[0] });
            const res5 = await contract.methods.getPerson(`${accounts[0]}`).call();
            console.log(res5);
            navigate("/");
        }catch(err){
            console.log(err);
        }
        setLoading(false);
    }

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
                        <input className={`${styles.customInput}`} type="date" placeholder={""} />
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
                    <div className={`${styles.inputGroup} ${styles.rowInputGroup} ${styles.spanInputGroup}`}>
                        <input className={`${styles.customCheckInput}`} type="checkbox" placeholder={""} />
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
                <span className={styles.textContent}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id metus id urna semper tempus vel ut massa. Maecenas vehicula mollis purus non ullamcorper. Aenean facilisis ex eu dolor consequat, sed rhoncus enim molestie. Suspendisse quis risus bibendum, egestas nunc sit amet, faucibus dolor. Vivamus eget magna arcu.</span>
                <div className={styles.endSeperator}></div>
            </div>
        </div>
    ); 
}

export default RegisterPerson;