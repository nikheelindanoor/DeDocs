import React, { useState, useEffect } from "react";
import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import LocationCityIcon from "@mui/icons-material/LocationCity";

const Register = () => {
  const navigate = useNavigate();

  const handleIndividualRegBtn = () => {
    navigate("/registerPerson");
  };

  const handleOrganizationRegBtn = () => {
    navigate("/organizations");
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
        <span className={styles.heading}>Create new account</span>
        <div className={styles.registerOptionContainer}>
          <div className={styles.registerCard} onClick={handleIndividualRegBtn}>
            <PersonIcon sx={{ fontSize: 50, marginBottom: 1 }} />
            <span>Individual</span>
          </div>
          <div
            className={styles.registerCard}
            onClick={handleOrganizationRegBtn}
          >
            <LocationCityIcon sx={{ fontSize: 50, marginBottom: 1 }} />
            <span>Organization</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
