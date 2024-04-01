import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import styles from './WideModal.module.css'; 

export default function WideModal({ open, closeLink, children }) {
    const navigate = useNavigate();

    const modalVariants = {
        hidden: {
            y: "100px",
            opacity: 0,
        },
        visible: {
            y: "0",
            opacity: 1,
            transition: {
                duration: 0.03,
                type: "spring",
                damping: 50,
                stiffness: 600,
            },
        },
        exit: {
            y: "100px",
            opacity: 0,
            transition: {
                duration: 0.03,
                type: "spring",
                damping: 50,
                stiffness: 600,
            },
        },
    };

    return (
        <AnimatePresence
            mode="wait"
        >
            {open &&
                <motion.div
                    className={styles.modal}
                    variants={modalVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <div className={styles.close} onClick={() => navigate(closeLink)}><FontAwesomeIcon icon={faXmark} /></div>
                    {children}
                </motion.div>
            }
        </AnimatePresence>
    );
}