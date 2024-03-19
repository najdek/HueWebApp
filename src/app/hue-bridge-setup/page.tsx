"use client";
import { Container, Typography, Button, TextField } from "@mui/material";
import { bridgeNew } from "./bridge-new";
import useSWR from "swr";
import { useState } from "react";
import React from "react";
import { useRef } from "react";

function connectClick(ip: string){
    alert();
}

export default function HueBridgeSetupPage() {
  const [ipInput, setIpInput] = useState("")
  let bridgeNewOutput = useRef<HTMLIFrameElement>(null);
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
              onChange={(event)=> (setIpInput(event.target.value))}
            />
          </div>
          <div className="grid col-span-4 mt-4 sm:mt-0 sm:mx-4 sm:col-span-1">
            <Button variant="contained" size="large" onClick={() => bridgeNew(ipInput, bridgeNewOutput)}>
              Connect
            </Button>
          </div>
          <div className="grid col-span-5 mt-6">
            <Typography variant="h6" className="whitespace-pre-wrap" ref={bridgeNewOutput}></Typography>
          </div>
        </div>
      </Container>
    </main>
  );
}
