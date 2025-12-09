import { FaFacebook, FaInstagram, FaTwitter, FaCcVisa, FaCcMastercard, FaCcAmex } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import styles from "../../styles/component/footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>

        {/* ----- COMPANY SECTION ----- */}
        <div className={styles.footerSection}>
          <h3>StoreFleet</h3>
          <p>Your trusted e-commerce destination for fast, safe & quality shopping.</p>

          <div className={styles.footerSocials}>
            <FaFacebook />
            <FaInstagram />
            <FaTwitter />
          </div>
        </div>

        {/* ----- QUICK LINKS ----- */}
        <div className={styles.footerSection}>
          <h4>Quick Links</h4>
          <ul>
            <li>About Us</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
            <li>Return & Refunds</li>
            <li>Shipping Info</li>
          </ul>
        </div>

        {/* ----- CUSTOMER SERVICE ----- */}
        <div className={styles.footerSection}>
          <h4>Customer Service</h4>
          <ul>
            <li>Track Order</li>
            <li>Wishlist</li>
            <li>FAQs</li>
            <li>Help Center</li>
            <li>Contact Support</li>
          </ul>
        </div>

        {/* ----- CONTACT SECTION ----- */}
        <div className={styles.footerSection}>
          <h4>Contact Us</h4>

          <p><MdLocationOn /> New Delhi, India</p>
          <p><MdPhone /> +91 999999999</p>
          <p><MdEmail /> support@storefleet.com</p>

          <div className={styles.paymentIcons}>
            <FaCcVisa />
            <FaCcMastercard />
            <FaCcAmex />
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className={styles.footerBottom}>
        © 2025 StoreFleet — All Rights Reserved.
      </div>
    </footer>
  );
}
