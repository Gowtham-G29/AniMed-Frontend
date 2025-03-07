/* eslint-disable react/prop-types */
import { Badge } from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";

function ApprovalRequestBadge({count}) {
  return (
    <div>
      <Badge color="secondary" badgeContent={count}>
        <HowToRegIcon />
      </Badge>
    </div>
  );
}

export default ApprovalRequestBadge;
