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
        <span className={styles.heading}>DeDocs</span>
        <span className={styles.textContent}>
        If you are an individual, just head over to the individual section and get yourself registered.
        <br/><br/>
        If you are an organization, just move over to the organization section, and get registered as any of the Educational, Medical or Criminal organization
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
