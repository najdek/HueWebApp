"use client";

import { xyToRgb } from "@/app/colors";
import { rgbToHex } from "@/app/colors";
import { hsvToRgb } from "@/app/colors";
import { hexToHs } from "@/app/colors";
import { kelvinToCt } from "@/app/colors";
import { ctToPickerKelvin } from "@/app/colors";
import { kelvinToRgb } from "@/app/colors";
import { ctToHex } from "@/app/colors";
import { lightOrDark } from "@/app/colors";

import { Typography } from "@mui/material";

export function Light(o) {
  return (
    <>
      <div
        className={`min-h-20 w-full flex rounded-t-md ${o.isDark ? "text-white" : "text-black"}`}
        style={{ backgroundColor: "#" + o.color }}
      >
        <div className="flex justify-between items-center w-full min-h-max px-6">
            <div className="inline-flex justify-start text-2xl font-medium">{o.name}</div>
            <div className="inline-flex justify-end">buttons</div>
        </div>
      </div>
      <div
        className={`min-h-6 w-full flex rounded-b-md bg-gradient-to-r from-gray-800 mb-4 ${o.isDark ? "text-white" : "text-black"}`}
        style={{ backgroundColor: "#" + o.color }}
      >
        </div>
    </>
  );
}

export function DrawAllLights(o) {
  let data = o.data;
  console.log(data);
  let groups = [];
  for (var obj in data) {
    let key = Object.keys(data).indexOf(obj);
    let thisLight = data[obj];
    console.log(thisLight);

    let hexcolor, isDark;
    if (thisLight.state.colormode == "ct") {
      hexcolor = ctToHex(thisLight.state.ct);
    } else if (thisLight.state.colormode == "hs") {
      hexcolor = hsvToRgb(thisLight.state.hue, thisLight.state.sat);
    } else if (thisLight.state.colormode == "xy") {
      hexcolor = xyToRgb(thisLight.state.xy[0], thisLight.state.xy[1]);
    }

    if (thisLight.state.on == false) {
      hexcolor = "999999";
    }

    if (lightOrDark(hexcolor) == "light") {
      isDark = false;
    } else {
      isDark = true;
    }

    groups.push(
      <Light
        id={obj}
        on={thisLight.state.on}
        color={hexcolor}
        name={thisLight.name}
        isDark={isDark}
      ></Light>
    );
  }
  return <>{groups}</>;
}
