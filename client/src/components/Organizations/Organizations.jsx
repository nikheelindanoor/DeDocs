import React, { useState, useEffect } from "react";
import styles from "./Organizations.module.css";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";

const Organization = () => {
  const navigate = useNavigate();

  const handleEduOrgRegBtn = () => {
    navigate("/registerEduOrg");
  };

  const handleMediOrgRegBtn = () => {
    navigate("/registerMediOrg");
  };

  const handleCrimiOrgRegBtn = () => {
    navigate("/registerCrimiOrg");
  };
  return (
    <div className={styles.registerPageContainer}>
      <div className={styles.registerContentContainer}>
        <span className={styles.heading}>Project Magnellanic</span>
        <span className={styles.textContent}>
        Click on any of the below buttons, based on the type of type of organization you are! 
        <br/><br/>
        Organizations act as bodies which distribute Records or Documents digitally to the user. It can be an Educational Center, a Medical Facility or Crime and Police Department.
        </span>
        <span className={styles.heading}>Register New Organization</span>
        <div className={styles.registerOptionContainer}>
          <div className={styles.registerCard} onClick={handleEduOrgRegBtn}>
            <LocationCityIcon sx={{ fontSize: 50, marginBottom: 1 }} />
            <span className={styles.textWrap}>Educational Organization</span>
          </div>
          <div className={styles.registerCard} onClick={handleMediOrgRegBtn}>
            <LocalHospitalIcon sx={{ fontSize: 50, marginBottom: 1 }} />
            <span>Medical Organization</span>
          </div>
          <div className={styles.registerCard} onClick={handleCrimiOrgRegBtn}>
            <LocalPoliceIcon sx={{ fontSize: 50, marginBottom: 1 }} />
            <span>Criminal Organization</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Organization;
