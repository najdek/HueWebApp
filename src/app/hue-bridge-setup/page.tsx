"use client";
import { Container, Typography, Button, TextField, List } from "@mui/material";
import { bridgeNew } from "./bridge-new";
import { useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import {
  HueSettingsProxyToggle,
  HueSettingsSslToggle,
} from "@/components/HueSettings";

export default function HueBridgeSetupPage() {
  const [ipInput, setIpInput] = useState<string>("");
  const [setupResult, setSetupResult] = useState<string>();

  const { push } = useRouter();

  const handleConnectBtnClick = async function () {
    let out = await bridgeNew(ipInput);
    let outputText;

    if (out.error) {
      if (out.error.type == 101) {
        // link button not pressed
        outputText =
          "Press the link button on your Bridge \nThen try to Connect again";
      } else {
        // unknown error
        outputText = "Error:\n" + JSON.stringify(out);
      }
    } else {
      if (out.success) {
        if (typeof window !== "undefined") {
          localStorage.setItem("bridgeIp", ipInput);
          localStorage.setItem("bridgeAuth", out.success.username);
        }
          outputText = "Bridge connected!";
          push("/hue-main");
      }
    }
    setSetupResult(outputText);
  };

  return (
    <main>
      <Container maxWidth="sm">
        <div className="my-8">
          <Typography variant="h5">Connect to your Hue Bridge</Typography>
        </div>
        <div className="grid grid-cols-4">
          <div className="grid text-center col-span-4 sm:mx-4 sm:col-span-3">
            <TextField
              id="outlined-basic"
              label="IP Address"
              variant="outlined"
              className="w-full"
              onChange={(event) => setIpInput(event.target.value)}
            />
          </div>
          <div className="grid col-span-4 mt-4 sm:mt-0 sm:mx-4 sm:col-span-1">
            <Button
              variant="contained"
              size="large"
              onClick={handleConnectBtnClick}
            >
              Connect
            </Button>
          </div>
          <div className="grid col-span-4 mt-6">
            <Typography variant="h6" className="whitespace-pre-wrap">
              {setupResult}
            </Typography>
          </div>
          <div className="grid col-span-4 mt-4">
          <List>
            <HueSettingsProxyToggle />
            <HueSettingsSslToggle />
          </List>
          </div>

        </div>
      </Container>
    </main>
  );
}
