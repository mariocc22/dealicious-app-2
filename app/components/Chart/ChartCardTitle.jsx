import Pin from "@/app/components/svg/pin.svg";
import { Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

function ChartCardTitle({
  data,
  text,
  showPin,
  pinStatus,
  onPinClick,
  pinIdSelected,
}) {
  const theme = useTheme();
  const [pinned, setPinned] = useState(pinStatus);

  useEffect(() => {
    setPinned(pinStatus);
  }, [pinStatus]);

  if (pinStatus == true) {
    // console.log(data);
  }
  const onClick = () => {
    onPinClick(data);
    pinIdSelected(data._id);
    setPinned(!pinned);
  };
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 0.17fr",
        justifyContent: "space-between",
        alignItems: "start",
        width: "100%",
        // minHeight: "90px",
      }}
    >

      {/*  sx={{ fontSize: "48px" }} */}
      <Typography variant="h3"  sx={{ fontSize: "28px" }}>{text}</Typography>

      <Pin
        style={{
          justifySelf: "end",

          display: showPin ? "block" : "none",
          fill: pinned ? theme.palette.primary[80] : "transparent",

          stroke: pinned
            ? theme.palette.primary[80]
            : theme.palette.background.alt,
        }}
        onClick={onClick}
      />
    </div>
  );
}

export default ChartCardTitle;
