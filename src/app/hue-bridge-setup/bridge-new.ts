"use client";
import { getApiUrl } from "../hue-main/hue";

export async function bridgeNew(ip: string) {
  const res = await fetch(getApiUrl(ip), {
    method: "POST",
    body: JSON.stringify({ devicetype: "HueWebApp" }),
  });
  const data = await res.json();
  console.log(data);
  return data[0];
}