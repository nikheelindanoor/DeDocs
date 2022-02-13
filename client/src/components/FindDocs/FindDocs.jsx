import React, {useState, useEffect, useContext} from 'react';
import styles from './FindDocs.module.css';
import SearchIcon from '@mui/icons-material/Search';
import tick from '../../assets/tick.svg';
import { useNavigate } from "react-router-dom";
import { ContractContext } from "../../contexts/ContractContext";


const FindDocs = () => {
    const {state, name} = useContext(ContractContext);
    const navigate = useNavigate();
    const [orgInfo, setOrgInfo] = useState({});
    const [userAddress, setUserAddress] = useState("");
    const [docList, setDocList] = useState([]);

    // const handleViewRecord = () => {}
    // const handleAddRecord = () => {
    //     navigate("/addrecord");
    // }

    const handleDocClick = (obj) => {
        navigate("/doc", {state:obj});
    }

    const searchUserRecords = async () => {
        const { accounts, contract } = state;
        try{
            const res = await contract.methods.getDocsList(`${userAddress}`, Number(orgInfo.type_org)).call();
            console.log(res);
            setDocList(res);
        }catch(err){
            console.log(err)
        }
    }

    useEffect(async() => {
        const { accounts, contract } = state;
        if(contract){
          const res = await contract.methods.getOrg(`${accounts[0]}`).call();
          console.log(res);
          setOrgInfo(res);
        //   setPersonInfo(res5);
        }
      }, [state])

    return (
        <div className={styles.findDocsPageContainer}>
            <div className={styles.findDocsPageContent}>
                <div className={styles.orgNameContainer}>
                    <span className={styles.heading}>{orgInfo.name ? orgInfo.name : "Loading..."}</span>
                    <div className={styles.verifyIconContainer}>
                        {(orgInfo.isVerified && orgInfo.isVerified == true) ? <img className={styles.verifyIcon} src={tick}/> : <></> }
                    </div>
                </div>
                <div className={styles.subTitle}>Search User Records</div>
                <div className={styles.recordSearchForm}>
                    <div className={styles.inputGroup}>
                        <span className={styles.inputLabel}>Person's Address</span>
                        <input value={userAddress} onChange={(e) => {setUserAddress(e.target.value)}} className={`${styles.customInput} ${styles.smallInput}`} type="text" placeholder={"Ethereum Address"} />
                    </div>
                    <div className={styles.inputGroup}>
                        <button onClick={searchUserRecords} className={styles.verifyBtn}>
                            <SearchIcon />
                        </button>
                    </div>
                </div>
                <div className={styles.subTitleResults}>Results</div>
                <div className={styles.docListContainer}>
                    {
                        docList.map((doc, index) => {
                            return <div onClick={()=>{handleDocClick(doc);}} className={styles.docCard} key={index}>
                                <span className={styles.docCardTitle}>{doc.doc_title}</span>
                                <span className={styles.docCardOrg}>by {doc.org_name}</span>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default FindDocs;