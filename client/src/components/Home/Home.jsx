import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import qr from "../../images/qr-black.jpg";
import { ContractContext } from "../../contexts/ContractContext";
import { useContext } from "react";
import PersonHome from "../PersonHome/PersonHome";
import OrgHome from "../OrgHome/OrgHome";
import OwnerHomePage from "../OwnerHomePage/OwnerHomePage";
import bc from "../../images/bc2.png";

const Home = () => {
  const navigate = useNavigate();
  const { state, name } = useContext(ContractContext);
  const [userRole, setUserRole] = useState(0);

  const checkRole = async () => {
    const { accounts, contract } = state;
    console.log(accounts);
    console.log(contract);
    try {
      const res = await contract.methods.checkRole(`${accounts[0]}`).call();
      setUserRole(res);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkRole();
  }, [state]);


  const getPage = () => {
    if (userRole == 0) {
      return (
        <div className={styles.homePageContainer}>
          <style>
            @import
            url('https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Libre+Baskerville:wght@400;700&family=Lobster&family=Lobster+Two:ital@1&family=Poppins:wght@100;300&family=Quintessential&family=Shizuru&family=Ubuntu+Mono&display=swap');
          </style>
          <div className={styles.navBarContainer}>
            <div className={styles.navBarContent}>
              <span>Project Magellanic</span>
            </div>
          </div>
          <div className={styles.lineSepeartor}></div>
          <div className={styles.mainContainer}>
            <div className={styles.mainContent}>
              <span className={styles.tagLine}>A Decentralized Solution to Reduce Fraud Documents.
                   <br /> Making People's life more secure and convenient.</span>
              <button onClick={() => {
                   navigate("/register");
                }}
              className={styles.registerBtn}>Register</button>
            </div>
          </div>
        </div>

        // <div>
        //   <style>
        //     @import
        //     url('https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Libre+Baskerville:wght@400;700&family=Lobster&family=Lobster+Two:ital@1&family=Poppins:wght@100;300&family=Quintessential&family=Shizuru&family=Ubuntu+Mono&display=swap');
        //   </style>
        //   <div className={styles.allContent}>
        //     <div className={styles.topBar}>
        //       <div>
        //         <h3 className={`${styles.mainHead} ${styles.projectName}`}>
        //           Project Magellanic
        //         </h3>
        //       </div>
        //     </div>
        //     <div className={styles.line}></div>

        //     <div className={styles.button}>
        //       <div className={styles.tagLine}>
        //         <h1>
        //           A Decentralized Approach For Storing Documents.
        //           <br /> Making People's life more secure and convenient.
        //         </h1>
        //       </div>
        //       <button
        //         onClick={() => {
        //           navigate("/register");
        //         }}
        //         className={styles.registerBtn}
        //       >
        //         Register
        //       </button>
        //     </div>
        //   </div>
        //   <div className={styles.line}></div>
        // </div>
      );
    } else if (userRole == 1) {
      return <OwnerHomePage />;
    } else if (userRole == 2) {
      return <PersonHome />;
    } else if (userRole >= 3 && userRole <= 5) {
      return <OrgHome />;
    } else {
      return <div>Page not found</div>;
    }
  };

  return <div>{getPage()}</div>;
};

export default Home;
