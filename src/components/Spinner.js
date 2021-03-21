import styles from './Spinner.module.css'

export default function Spinner(props) {
    if (!props.active) {
        return (null);
    }

    return (
        <div className={styles.spinnerWrapper}>
            <div className={styles.spinner}>
                <div className={styles['sk-cube-grid']}>
                    <div className={`${styles['sk-cube']} ${styles['sk-cube1']}`}></div>
                    <div className={`${styles['sk-cube']} ${styles['sk-cube2']}`}></div>
                    <div className={`${styles['sk-cube']} ${styles['sk-cube3']}`}></div>
                    <div className={`${styles['sk-cube']} ${styles['sk-cube4']}`}></div>
                    <div className={`${styles['sk-cube']} ${styles['sk-cube5']}`}></div>
                    <div className={`${styles['sk-cube']} ${styles['sk-cube6']}`}></div>
                    <div className={`${styles['sk-cube']} ${styles['sk-cube7']}`}></div>
                    <div className={`${styles['sk-cube']} ${styles['sk-cube8']}`}></div>
                    <div className={`${styles['sk-cube']} ${styles['sk-cube9']}`}></div>
                </div>
            </div>
        </div>
    )
}