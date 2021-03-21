import styles from './Dialog.module.css';

export default function Dialog(props) {
    if (!props.shouldDisplay) {
        return null;
    }

    return (
        <div className={styles.dialog} onClick={() => props.onClose()}>
            <div className={styles.dialogContent} onClick={e => e.stopPropagation()}>
                <h2>{props.title}</h2>
                <p>{props.message}</p>
                <div className={styles.dialogActions}>
                    <button onClick={() => props.onClose()}>Cancel</button>
                    <button onClick={() => {props.onClose(); props.onConfirm();}} style={{ backgroundColor: props.confirmButtonBgColor }}>{props.confirmActionTitle}</button>
                </div>
            </div>
        </div>
    )
}