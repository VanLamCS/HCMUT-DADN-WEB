import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import styles from './style.module.css'


function DefaultLayout({children}) { 
    return (
        <div className={styles.app}>
            <Sidebar />
            <div className = {styles.inner}>
                <Navbar />
                <div className = {styles.children}>{children}</div>
            </div>
        </div> 

    );
}

export default DefaultLayout;