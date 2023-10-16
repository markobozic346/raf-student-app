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

  return <HomePage data={data} />;
}
