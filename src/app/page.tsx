import axios from "axios";
import Image from "next/image";

const fetchData = async () => {
  return axios.get(
    "https://script.google.com/macros/s/AKfycbx-IHfmCLu265z22d38-A-F-ZcQEBSmBesbOa1Z-d8dnZfzoPW36tIvQWygvjRF3hr7/exec"
  );
};
export default async function Home() {
  const { data } = await fetchData();
  console.log(data);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {data.map((sheet: any) => (
        <p key={sheet.sheetName}>{sheet.sheetName}</p>
      ))}
    </main>
  );
}
