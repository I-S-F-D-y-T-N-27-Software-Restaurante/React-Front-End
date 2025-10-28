export const logFailedFetch = async (res: Response) => {
  if (!res.ok) {
    console.log("Fetch failed");
    console.log("Status code:", res.status);
    console.log("Status text:", res.statusText);
    const data = await res.json();
    console.log(data.detail);
  }
};
