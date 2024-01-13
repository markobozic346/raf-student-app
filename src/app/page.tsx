import HomePage from "./_home/HomePage";

const fetchData = async () => {
  const res = await fetch(
    "https://script.google.com/macros/s/AKfycbzsz2uYJKlGp04jISeQz9t5_fSFaAEBpdflm9jOxQ_iYSK9_3esG5eXxwilphbmrI1y/exec",
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  return res.json();
};

export default async function Home() {
  const data = await fetchData();

  return <HomePage data={data} />;
}
