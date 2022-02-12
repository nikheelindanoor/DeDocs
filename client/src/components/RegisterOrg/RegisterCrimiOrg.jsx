import React, { useState, useEffect } from "react";
import styles from "./RegisterOrg.module.css";
import crime from "../../images/crime2.png";


const RegisterCrimiOrg = () => {
    const handleGenderChange = (e) => {};

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
                className={`${styles.customInput} ${styles.smallInput}`}
                type="text"
                placeholder={"Name"}
              />
            </div>
  
            <div className={styles.inputGroup}>
              <span className={styles.inputLabel}>Contact Number</span>
              <input
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
                className={`${styles.customInput}`}
                type="text"
                placeholder={""}
              />
            </div>
            <div className={styles.inputGroup}>
              <span className={styles.inputLabel}>Email</span>
              <input
                className={`${styles.customInput}`}
                type="email"
                placeholder={""}
              />
            </div>
            <div className={`${styles.inputGroup} ${styles.spanInputGroup}`}>
              <span className={styles.inputLabel}>Address</span>
              <textarea
                className={`${styles.customInput} ${styles.addressInput}`}
              />
            </div>
            <div className={`${styles.inputGroup} ${styles.spanInputGroup}`}>
              <span className={styles.inputLabel}>About</span>
              <textarea
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
              <button className={styles.registerBtn}>REGISTER</button>
            </div>
          </div>
        </div>
        <div className={styles.infoContentContainer}>
          <span className={styles.heading}>Project Magnellanic</span>
          <img className={styles.crimeImage} src={crime} />
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

export default RegisterCrimiOrg;
