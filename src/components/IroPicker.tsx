import { Box, Container, IconButton, Modal, Typography } from "@mui/material";
import iro from "@jaames/iro";
import React from "react";
import { Close } from "@mui/icons-material";
import { hueLightSetColor, hueLightSetKelvin } from "@/app/hue-main/hue";
import { ctToHex, ctToPickerKelvin, hexToHs, kelvinToCt } from "@/app/colors";
import { fetchHueData } from "@/app/hue-main/hue";


class IroColorPicker extends React.Component {
  props: any;
  el: any;
  componentDidMount() {
    const { props } = this;
    const setHueLightsData = props.setHueLightsData;
    const setHueGroupsData = props.setHueGroupsData;
    // create a new iro color picker and pass component props to it
    const colorPicker = iro.ColorPicker(this.el, {
      width: props.width || "250",
      color: props.color || "#ffffff",
      layout: [
        {
          component: iro.ui.Wheel,
          options: {
            sliderType: "color",
            sliderShape: "circle",
          },
        },
      ],
    });
    // call onColorChange prop whenever the color changes
    colorPicker.on("input:end", (color: { hexString: string; }) => {
      if (props.onColorChange) props.onColorChange(color);
      let colorHs = hexToHs(color.hexString.substring(1));
      let hue = colorHs.h;
      let sat = colorHs.s;

      if (props.ids) {
        for (let i = 0; i < props.ids.length; i++) {
          hueLightSetColor(props.ids[i], true, hue, sat, 400);
        }
      } else {
        hueLightSetColor(props.id, true, hue, sat, 400);
      }
      fetchHueData(setHueLightsData, setHueGroupsData);
    });
  }
  /*
    componentDidUpdate() {
      // isolate color from the rest of the props
      const { color, ...colorPickerState } = this.props;
      // update color
        if (color) this.colorPicker.color.set(color);
        this.colorPicker.setState(colorPickerState);
      // push rest of the component props to the colorPicker's state
    }
    */
  render() {
    return (
      <div>
        <div ref={(el) => (this.el = el)} />
      </div>
    );
  }
}

class IroKelvinPicker extends React.Component {
  props: any
  el: any;
  componentDidMount() {
    const { props } = this;
    const setHueLightsData = props.setHueLightsData;
    const setHueGroupsData = props.setHueGroupsData;

    let pickerColor;
    if (props.colormode == "ct" && props.ct > 152 && props.ct < 501) {
      pickerColor = ctToPickerKelvin(props.ct);
    } else {
      pickerColor = ctToPickerKelvin(326);
    }

    // create a new iro color picker and pass component props to it
    const colorPicker = iro.ColorPicker(this.el, {
      width: props.width || "250",
      color: { kelvin: pickerColor } || "#ffffff",
      layout: [
        {
          component: iro.ui.Slider,
          options: {
            sliderType: "kelvin",
            sliderShape: "circle",
            layoutDirection: "horizontal",
          },
        },
      ],
    });
    // call onColorChange prop whenever the color changes
    colorPicker.on("input:end", (color: { kelvin: number; }) => {
      if (props.onColorChange) props.onColorChange(color);
      let ct = kelvinToCt(color.kelvin);

      if (props.ids) {
        for (let i = 0; i < props.ids.length; i++) {
          hueLightSetKelvin(props.ids[i], true, ct, 400);
        }
      } else {
        hueLightSetKelvin(props.id, true, ct, 400);
      }
      fetchHueData(setHueLightsData, setHueGroupsData);
    });
  }
  /*
    componentDidUpdate() {
      // isolate color from the rest of the props
      const { color, ...colorPickerState } = this.props;
      // update color
        if (color) this.colorPicker.color.set(color);
        this.colorPicker.setState(colorPickerState);
      // push rest of the component props to the colorPicker's state
    }
    */
  render() {
    return (
      <div>
        <div ref={(el) => (this.el = el)} />
      </div>
    );
  }
}

function PickerWrapper(o:any) {
  const handleColorPickerClose = () => {
    o.setModalOpen(false);
  };

  const boxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  return (
    <Container maxWidth="sm">
      <Box sx={{ ...boxStyle }}>
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h5">{o.title}</Typography>
          <IconButton onClick={handleColorPickerClose} aria-label="close">
            <Close />
          </IconButton>
        </div>
        {o.children}
      </Box>
    </Container>
  );
}


export function ColorPicker(o:any) {
  const handleColorPickerClose = () => {
    o.setColorPickerOpen(false);
  };

  return (
    <>
      <Modal open={o.colorPickerOpen} onClose={handleColorPickerClose}>
        <PickerWrapper
          setModalOpen={o.setColorPickerOpen}
          title={`Choose color`}
        >
          <IroColorPicker
            width={400}
            id={o.id}
            ids={o.ids}
            colormode={o.colormode}
            color={o.color}
            ct={o.ct}
            setHueLightsData={o.setHueLightsData}
            setHueGroupsData={o.setHueGroupsData}
          />
        </PickerWrapper>
      </Modal>
    </>
  );
}

export function KelvinPicker(o:any) {
  const handleKelvinPickerClose = () => {
    o.setKelvinPickerOpen(false);
  };

  return (
    <>
      <Modal open={o.kelvinPickerOpen} onClose={handleKelvinPickerClose}>
        <PickerWrapper
          setModalOpen={o.setKelvinPickerOpen}
          title={`Choose color temperature`}
        >
          <IroKelvinPicker
            width={400}
            id={o.id}
            ids={o.ids}
            colormode={o.colormode}
            color={o.color}
            ct={o.ct}
            setHueLightsData={o.setHueLightsData}
            setHueGroupsData={o.setHueGroupsData}
          />
        </PickerWrapper>
      </Modal>
    </>
  );
}
