import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

import styles from './Footer.module.css';

function Footer(){
    return(
        <footer className={styles.footer}>
            <ul className={styles.social_list}>
                <li>
                    <FaFacebook />
                </li>
                <li>
                     <FaInstagram />
                </li>
                <li>
                    <a href="https://www.linkedin.com/in/pedro-vinicius-lopes-6bb96a289" target="_black" rel="noopener noreferrer"><FaLinkedin /></a>
                </li>
            </ul>
            <p className={styles.copy_right}>
                <span>Costs &copy; 2025</span>
            </p>
        </footer>
    )
}

export default Footer;