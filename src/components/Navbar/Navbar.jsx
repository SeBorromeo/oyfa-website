import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faBars } from '@fortawesome/free-solid-svg-icons'
import { useMediaQuery } from "react-responsive";
import classes from "./Navbar.module.css";
import useScrollPosition from "/src/hooks/useScrollPosition";

/**
 * USAGE GUIDE: to be made... I am lazy
 */

//TODO: This should be dependant on window ;-;;;;
const SCROLL_POSITION_FOR_TRANSITION = 350; //Scroll Position = 0 is the top of the page (is this measured in pixels??) 
const MAX_WIDTH = "1000px" //Maximum window width to classify screen as "Mobile"

export default function Navbar({ logoImgSrc, navbar }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: MAX_WIDTH });
    const scrollPosition = useScrollPosition()

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMobileMenu = () => {
        if (isMobile) {
            setIsMenuOpen(false);
        }
    };

    return (
        <header className={classes.header}>
            <nav className={classes.nav + ` ${scrollPosition > SCROLL_POSITION_FOR_TRANSITION ? classes.nav_bg_color : ""}`}>
                <NavLink to="/" className={classes.nav_logo}>
                    <img src={logoImgSrc}/>
                </NavLink>
                {isMobile && (
                    <div className={classes.nav_toggle} id="nav-toggle" onClick={toggleMenu}>
                        <FontAwesomeIcon icon={faBars} />
                    </div>
                )}
                { isMobile ? (
                    <div className={classes.nav_menu + " " + (isMenuOpen ? classes.show_menu : "")} id="nav-menu">
                        <NavBarLinks navBarLinksDict={navbar} isMobile={isMobile} closeMobileMenu={closeMobileMenu}/>
                        <div className={classes.nav_close} id="nav-close" onClick={toggleMenu}>
                            <FontAwesomeIcon icon={faXmark} />
                        </div>
                    </div>

                ) : (
                    <NavBarLinks navBarLinksDict={navbar} isMobile={isMobile} closeMobileMenu={closeMobileMenu}/>
                )}
            </nav>
    </header>
    );
}

function NavBarLinks({ navBarLinksDict, isMobile, closeMobileMenu }) {
    return (
        <ul className={classes.nav_list}>
            {isMobile && <NavBarLink name='HOME' url='/' closeMobileMenu={closeMobileMenu} />}
            {Object.keys(navBarLinksDict).map((componentKey) => (
                <NavBarLink key={componentKey} {...navBarLinksDict[componentKey]} closeMobileMenu={closeMobileMenu} />
            ))}
        </ul>
    );
}

function NavBarLink( { name, url, closeMobileMenu } ) {
    return (
        <li>
            <NavLink to={url.toLowerCase()} className={classes.nav_link}  onClick={closeMobileMenu}>
                {name.toUpperCase()}
            </NavLink>
        </li>
    )
}