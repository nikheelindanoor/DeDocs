import React, { useState, useEffect } from "react";
import styles from "./Organizations.module.css";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import LocationCityIcon from "@mui/icons-material/LocationCity";

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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id
          metus id urna semper tempus vel ut massa. Maecenas vehicula mollis
          purus non ullamcorper. Aenean facilisis ex eu dolor consequat, sed
          rhoncus enim molestie. Suspendisse quis risus bibendum, egestas nunc
          sit amet, faucibus dolor. Vivamus eget magna arcu.
        </span>
        <span className={styles.heading}>Register New Organization</span>
        <div className={styles.registerOptionContainer}>
          <div className={styles.registerCard} onClick={handleEduOrgRegBtn}>
            <LocationCityIcon sx={{ fontSize: 50, marginBottom: 1 }} />
            <span>Register for Educational Organization</span>
          </div>
          <div className={styles.registerCard} onClick={handleMediOrgRegBtn}>
            <LocationCityIcon sx={{ fontSize: 50, marginBottom: 1 }} />
            <span>Register for Medical Organization</span>
          </div>
          <div className={styles.registerCard} onClick={handleCrimiOrgRegBtn}>
            <LocationCityIcon sx={{ fontSize: 50, marginBottom: 1 }} />
            <span>Register for Criminal Organization</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Organization;
