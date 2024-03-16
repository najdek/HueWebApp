"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Navigation } from "@mui/icons-material";
async function getData(ip: string, ref: HTMLIFrameElement) {
    const { push } = useRouter();

    const res = await fetch("http://" + ip + "/api", {
        method: "POST",
        body: JSON.stringify({"devicetype": "HueWebApp"})
    })
    const data = await res.json();
    console.log(data);
    if (data[0].error) {
        if (data[0].error.type == 101) {
            // link button not pressed
            ref.current.textContent = "Press the link button on your Bridge \nThen try to Connect again";
        } else {
            // unknown error
            ref.current.textContent = "Error:\n" + JSON.stringify(data);
        }
    } else {
        if (data[0].success) {
            localStorage.setItem("bridgeIp", ip);
            localStorage.setItem("bridgeAuth", data[0].success.username);
            useEffect(() => {
                push('/hue-main');
             }, []);
        }
    }
}

export function bridgeNew(ip: string, ref: HTMLIFrameElement) {
    alert(ip);
    console.log(getData(ip, ref));
    console.log(ref);
}