"use client";
import useSWR from "swr";

async function getData(ip: string, ref: HTMLIFrameElement) {
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
        }
    }
}

export function bridgeNew(ip: string, ref: HTMLIFrameElement) {
    alert(ip);
    console.log(getData(ip, ref));
    console.log(ref);
}