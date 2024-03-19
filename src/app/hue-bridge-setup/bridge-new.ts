"use client";
export async function bridgeNew(ip: string) {
  const res = await fetch("/hue-setup-proxy/" + ip, {
    method: "POST",
    body: JSON.stringify({ devicetype: "HueWebApp" }),
  });
  const data = await res.json();
  console.log(data);
  return data[0];
}
