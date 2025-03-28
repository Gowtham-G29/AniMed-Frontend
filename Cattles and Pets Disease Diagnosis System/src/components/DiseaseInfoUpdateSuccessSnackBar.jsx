/* eslint-disable react/prop-types */
import * as React from "react";
import { Transition } from "react-transition-group";
import { useTheme } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import WarningIcon from '@mui/icons-material/Warning';
import { Snackbar } from '@mui/base/Snackbar';
function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === "dark";
}

export default function DiseaseInfoUpdateSuccessSnackBar({ setanimalRegFail }) {
  const isDarkMode = useIsDarkMode();

  const [open, setOpen] = React.useState(false);
  const [exited, setExited] = React.useState(true);
  const nodeRef = React.useRef(null);

  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
        setanimalRegFail(false);
      return;
    }

    setOpen(false);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleOnEnter = () => {
    setExited(false);
  };

  const handleOnExited = () => {
    setExited(true);
  };

  useEffect(() => {
    handleClick();
  }, []);

  return (
    <div className={`${isDarkMode ? "dark" : ""}`}>
      <Snackbar
        autoHideDuration={5000}
        open={open}
        onClose={handleClose}
        exited={exited}
        className="fixed z-50 font-sans flex right-4 bottom-4 left-auto max-w-xl	min-w-xs"
      >
        <Transition
          timeout={{ enter: 400, exit: 400 }}
          in={open}
          appear
          unmountOnExit
          onEnter={handleOnEnter}
          onExited={handleOnExited}
          nodeRef={nodeRef}
        >
          {(status) => (
            <div
              className="flex gap-4	overflow-hidden	bg-green-100 dark:bg-slate-900 rounded-lg	border border-solid border-slate-200 dark:border-slate-700 shadow-md text-slate-900 dark:text-slate-50 p-3	text-start"
              style={{
                transform: positioningStyles[status],
                transition: "transform 300ms ease",
              }}
              ref={nodeRef}
            >
              <WarningIcon
                sx={{
                  color: "success.main",
                  flexShrink: 0,
                  width: "1.25rem",
                  height: "1.5rem",
                }}
              />
              <div className="flex-1	max-w-full">
                <p className="m-0 leading-normal mr-2 font-medium">
                  Successfully Updated !
                </p>
                <p className="m-0 leading-normal font-normal	text-green-500 dark:text-slate-400">
                 Good job !
    
                </p>
              </div>
              <CloseIcon
                onClick={handleClose}
                className="cursor-pointer	shrink-0	p-0.5	rounded hover:bg-green-200 hover:dark:bg-slate-800"
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
  unmounted: "translateX(500px)",
};
