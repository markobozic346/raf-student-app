import axios from "axios";

import HomePage from "./_home/HomePage";

const fetchData = async () => {
  const res = await fetch(
    "https://script.google.com/macros/s/AKfycbx-IHfmCLu265z22d38-A-F-ZcQEBSmBesbOa1Z-d8dnZfzoPW36tIvQWygvjRF3hr7/exec",
    { next: { revalidate: 300 } }
  );

  return res.json();
};

export default async function Home() {
  const data = await fetchData();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <HomePage data={data} />
    </main>
  );
}
