import { useState, useRef, useEffect } from "react";
import { IconButton, Button, SvgIcon } from "@mui/material";
import { FiCheck, FiAlertTriangle, FiLoader, FiSave } from "react-icons/fi";
import styles from "styles/SaveButton.module.css";

const SaveButton = ({
  click = async (f) => f,
  iconButton = true,
  child,
  ...props
}) => {
  const [saveStatus, setSaveStatus] = useState("none");
  const [changed, setChanged] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const resetStatus = () => {
    setSaveStatus("none");
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setChanged(false);
    }, 500);
  };

  const handleSave = () => {
    clearTimeout(timerRef.current);

    setSaveStatus("loading");
    setChanged(true);
    click()
      .then(() => {
        setSaveStatus("success");
        timerRef.current = setTimeout(() => {
          resetStatus();
        }, 2000);
      })
      .catch(() => {
        setSaveStatus("error");
        timerRef.current = setTimeout(() => {
          resetStatus();
        }, 2000);
      });
  };

  const def =
    props.color === undefined
      ? iconButton
        ? "default"
        : "primary"
      : props.color;

  const currentColor =
    saveStatus !== "none" && saveStatus !== "loading" ? saveStatus : def;

  const Btn = (props) => {
    if (iconButton) return <IconButton {...props}>{props.children}</IconButton>;
    return <Button {...props}>{props.children}</Button>;
  };

  return (
    <Btn onClick={handleSave} {...props} color={currentColor}>
      {saveStatus !== "none" ? (
        saveStatus !== "loading" ? (
          saveStatus === "success" ? (
            <SvgIcon className={styles.fade}>
              <FiCheck />
            </SvgIcon>
          ) : (
            <SvgIcon className={styles.fade}>
              <FiAlertTriangle />
            </SvgIcon>
          )
        ) : (
          <SvgIcon className={styles.rotating}>
            <FiLoader className={styles.fade} />
          </SvgIcon>
        )
      ) : child === undefined ? (
        <SvgIcon className={changed ? styles.fade : ""}>
          <FiSave />
        </SvgIcon>
      ) : (
        <span className={changed ? styles.fade : ""}>{child}</span>
      )}
    </Btn>
  );
};

export default SaveButton;
