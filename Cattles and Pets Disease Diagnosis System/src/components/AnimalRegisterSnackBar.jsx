/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { Transition } from "react-transition-group";
import { useTheme } from "@mui/system";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseIcon from "@mui/icons-material/Close";
import { Snackbar } from '@mui/base/Snackbar';

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === "dark";
}

export default function AnimalRegisterSnackBar({ setanimalRegStatus }) {
  const isDarkMode = useIsDarkMode();

  const [open, setOpen] = React.useState(false);
  const nodeRef = React.useRef(null);

  useEffect(() => {
    setOpen(true); // Open snackbar on mount
  }, []);

  const handleClose = (_, reason) => {
    if (reason === "clickaway") setanimalRegStatus(false);
    setOpen(false);
    return;
  };

  return (
    <div className={`${isDarkMode ? "dark" : ""}`}>
      <Snackbar
        autoHideDuration={5000}
        open={open}
        onClose={handleClose}
        className="fixed z-50 font-sans flex right-4 bottom-4 max-w-xl min-w-xs"
        aria-live="polite"
      >
        <Transition
          timeout={{ enter: 400, exit: 400 }}
          in={open}
          appear
          unmountOnExit
          nodeRef={nodeRef}
        >
          {(status) => (
            <div
              className="flex gap-4 overflow-hidden bg-white dark:bg-slate-900 rounded-lg border border-solid border-slate-200 dark:border-slate-700 shadow-md text-slate-900 dark:text-slate-50 p-3"
              style={{
                transform: positioningStyles[status],
                transition: "transform 300ms ease",
              }}
              ref={nodeRef}
            >
              <CheckRoundedIcon
                sx={{
                  color: "success.main",
                  flexShrink: 0,
                  width: "1.25rem",
                  height: "1.5rem",
                }}
              />
              <div className="flex-1 max-w-full">
                <p className="m-0 leading-normal mr-2 font-medium">
                  Animal Registration is Successful!
                </p>
                <p className="m-0 leading-normal font-normal text-slate-800 dark:text-slate-400">
                  Please wait for the Doctor&apos;s reply!
                </p>
              </div>
              <CloseIcon
                onClick={handleClose}
                className="cursor-pointer shrink-0 p-0.5 rounded hover:bg-slate-50 hover:dark:bg-slate-800"
              />
            </div>
          )}
        </Transition>
      </Snackbar>
    </div>
  );
}

const positioningStyles = {
  entering: "translateX(0)",
  entered: "translateX(0)",
  exiting: "translateX(500px)",
  exited: "translateX(500px)",
};
