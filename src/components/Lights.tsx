"use client";

import { xyToRgb, hsvToRgb, ctToHex, lightOrDark } from "@/app/colors";
import { IconButton, Slider, styled, Switch, SwitchProps, Snackbar } from "@mui/material";
import { hueLightSetBrightness, hueLightSetState, fetchHueData } from "@/app/hue-main/hue";
import { ColorPicker, KelvinPicker } from "./IroPicker";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import ContrastIcon from "@mui/icons-material/Contrast";
import dynamic from "next/dynamic";
import { SyntheticEvent, useState } from "react";

const CustomSlider = styled(Slider)({
  color: "#00000000",
  height: 0,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 32,
    width: 32,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&::before": {
      display: "none",
    },
    transition: "left 0.5s",
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 16,
    background: "unset",
    padding: 0,
    width: 36,
    height: 36,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#444",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&::before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

const StyledSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#88888855",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));


export function Light(props: any) {
  const [snackbarText, setSnackbarText] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(props.isOn);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [kelvinPickerOpen, setKelvinPickerOpen] = useState(false);
  const setHueLightsData = props.setHueLightsData;
  const setHueGroupsData = props.setHueGroupsData;

  var ids:Array<number>;
  if (props.mode == "group") {
    ids = props.ids;
  } else {
    ids = [props.id];
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleBrightnessChange = (vent: Event | SyntheticEvent<Element, Event>, value: number | any) => {
    let newValue = value;
    let newBri = Math.round((newValue * 255) / 100);

    for (let i = 0; i < ids.length; i++) {
      hueLightSetBrightness(ids[i], newBri, 200);
    }

    setSnackbarOpen(false);
    setSnackbarText(
      "Changing brightness of " + props.mode + " [" + props.name + "] to " + value + "%"
    );
    setSnackbarOpen(true);
    fetchHueData(setHueLightsData, setHueGroupsData);
  };

  const handleSwitch = (event: any) => {
    let newState = event.target.checked;
    setSwitchChecked(newState);
    for (let i = 0; i < ids.length; i++) {
      hueLightSetState(ids[i], newState, 200);
    }

    setSnackbarOpen(false);
    setSnackbarText(
      "Toggling " + props.mode + " [" + props.name + "]. New state: " + (newState ? "ON" : "OFF")
    );
    setSnackbarOpen(true);
    fetchHueData(setHueLightsData, setHueGroupsData);
  };

  return (
    <>
      <div
        className={`min-h-20 w-full flex rounded-t-md ${props.isDark ? "text-white" : "text-black"
          }`}
        style={{
          backgroundColor: "#" + props.color,
          transition: "background-color 500ms linear",
        }}
      >
        <div className="flex justify-between items-center w-full min-h-max px-6">
          <div className="inline-flex justify-start text-2xl font-medium">
            {props.name}
          </div>
          <div className="inline-flex justify-end items-center space-x-4">
            {/* buttons */}
            <div onClick={() => setKelvinPickerOpen(true)}>
              <IconButton
                aria-label="set color temperature"
              >
                <ContrastIcon className={props.isDark ? "text-white" : "text-black"} />
              </IconButton>
            </div>
            <div onClick={() => setColorPickerOpen(true)}>
              <IconButton aria-label="set color">
                <ColorLensIcon className={props.isDark ? "text-white" : "text-black"} />
              </IconButton>
            </div>
            <StyledSwitch checked={switchChecked} onChange={handleSwitch} />
          </div>
        </div>
      </div>
      {/* brightness slider */}
      <div
        className={`w-full flex rounded-b-md bg-gradient-to-r from-gray-800 mb-4 px-4 ${props.isDark ? "text-white" : "text-black"
          }`}
        style={{ backgroundColor: "#" + props.color }}
      >
        <CustomSlider
          key={`bri-slider-light-${props.id}`}
          sx={{
            '& input[type="range"]': {
              WebkitAppearance: "slider-horizontal",
            },
          }}
          orientation="horizontal"
          value={props.lightBrightness}
          step={1}
          min={0}
          max={100}
          aria-label="Brightness"
          valueLabelDisplay="auto"
          onChangeCommitted={handleBrightnessChange}
        />
      </div>
      <Snackbar
        autoHideDuration={800}
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message={snackbarText}
      />
      <ColorPicker
        id={props.id}
        ids={ids}
        setColorPickerOpen={setColorPickerOpen}
        colorPickerOpen={colorPickerOpen}
        colormode={props.colormode}
        color={props.color}
        ct={props.ct}
        mode="color"
        setHueLightsData={props.setHueLightsData}
        setHueGroupsData={props.setHueGroupsData}
      />

      <KelvinPicker
        id={props.id}
        ids={ids}
        kelvinPickerOpen={kelvinPickerOpen}
        setKelvinPickerOpen={setKelvinPickerOpen}
        colormode={props.colormode}
        color={props.color}
        ct={props.ct}
        mode="kelvin"
        setHueLightsData={props.setHueLightsData}
        setHueGroupsData={props.setHueGroupsData}
      />
    </>
  );
}


export function DrawAllLightsNoSSR(props: any) {
  let data = props.data;
  let elements = [];
  for (var obj in data) {
    let key = Object.keys(data).indexOf(obj);
    let thisLight = data[obj];
    console.log(thisLight);

    let lightState;

    if (props.mode == "group") {
      // group of lights
      let groupType = thisLight.type;
      if (groupType !== "Room" && groupType !== "Zone") {
        continue;
      }
      lightState = thisLight.action;
      var lightIds = thisLight.lights;
    } else {
      // single light
      lightState = thisLight.state;
    }


    let hexcolor, isDark;
    let ct = 0;
    let colormode = lightState.colormode;
    if (colormode == "ct") {
      ct = lightState.ct;
      hexcolor = ctToHex(ct);
    } else if (colormode == "hs") {
      hexcolor = hsvToRgb(lightState.hue, lightState.sat);
    } else if (colormode == "xy") {
      hexcolor = xyToRgb(lightState.xy[0], lightState.xy[1]);
    }

    if (lightState.on == false) {
      hexcolor = "999999";
    }

    if (lightOrDark(hexcolor) == "light") {
      isDark = false;
    } else {
      isDark = true;
    }

    let lightBrightness = Math.round((lightState.bri / 255) * 100);

    elements.push(
      <Light
        id={obj}
        ids={lightIds || null}
        mode={props.mode}
        isOn={lightState.on}
        colormode={colormode}
        color={hexcolor}
        ct={ct}
        name={thisLight.name}
        isDark={isDark}
        lightBrightness={lightBrightness}
        setHueLightsData={props.setHueLightsData}
        setHueGroupsData={props.setHueGroupsData}
      ></Light>
    );
  }
  return <>{elements}</>;
}
export const DrawAllLights: any = dynamic(() => Promise.resolve(DrawAllLightsNoSSR), {
  ssr: false,
})

