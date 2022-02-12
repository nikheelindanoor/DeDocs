import React, {useState, useEffect, useRef} from 'react';
import styles from './OrgAddRecord.module.css';
import SearchIcon from '@mui/icons-material/Search';
import UploadIcon from '@mui/icons-material/Upload';
import tick from '../../assets/tick.svg';

const OrgAddRecord = () => {

    const uploadImageInput = useRef(null);
    const [fileName, setFileName] = useState("Select file")

    const handleUploadImage = () => {
        uploadImageInput.current.click();
    }

    const handleFileChange = (e) => {
        setFileName(e.target.files[0].name);
    }

    const searchUser = () => {
        
    }

    return (
        <div className={styles.orgAddRecordPageContainer}>
            <div className={styles.orgAddRecordContent}>
                <div className={styles.orgNameContainer}>
                    <span className={styles.heading}>Veermata Jijabai Technological Institute</span>
                    <div className={styles.verifyIconContainer}>
                        <img className={styles.verifyIcon} src={tick}/>
                    </div>
                </div>
                <div className={styles.subHeading}>Add Record</div>
                <div className={styles.recordForm}>
                    <div className={styles.inputGroup}>
                        <span className={styles.inputLabel}>Person's Address</span>
                        <input className={`${styles.customInput} ${styles.smallInput}`} type="text" placeholder={"Ethereum Address"} />
                    </div>
                    <div className={styles.inputGroup}>
                        <button onClick={searchUser} className={styles.verifyBtn}>
                            <SearchIcon />
                        </button>
                    </div>
                    <div className={styles.inputGroup}>
                        <span className={styles.inputLabel}>Aadhar Number</span>
                        <input className={`${styles.customInput} ${styles.disabledInput}`} disabled type="number" pattern="\d*" maxlength="12" placeholder={"0000-0000-0000-0000"} />
                    </div>
                    <div className={styles.inputGroup}>
                        <span className={styles.inputLabel}>Contact Number</span>
                        <input className={`${styles.customInput} ${styles.disabledInput}`} disabled type="number" placeholder={""} />
                    </div>
                    <div className={styles.inputGroup}>
                        <span className={styles.inputLabel}>Record Title</span>
                        <input className={`${styles.customInput}`} type="text" placeholder={""} />
                    </div>
                    <div></div>
                    <div className={`${styles.inputGroup} ${styles.spanInputGroup}`}>
                        <span className={styles.inputLabel}>Description</span>
                        <textarea className={`${styles.customInput} ${styles.addressInput}`}/>
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
                        <input className={`${styles.customCheckInput}`} type="checkbox" placeholder={""} />
                        <span className={styles.inputLabel}>I assure that the above infomation is correct.</span>
                    </div>
                    <div className={styles.inputGroup}>
                        <button className={styles.registerBtn}>REGISTER</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrgAddRecord;