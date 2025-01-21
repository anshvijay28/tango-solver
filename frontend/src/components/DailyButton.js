function DailyButton() {
  const handleScrape = () => {
    console.log("scraping!");
  }
  
  return (
    <button
        onClick={handleScrape}
        className="inline-flex h-12 items-center justify-center rounded-md bg-neutral-950 px-6 font-medium text-neutral-50 shadow-lg shadow-neutral-500/20 transition active:scale-95 mt-5 disabled:bg-neutral-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Daily
      </button>
  );

}

export default DailyButton;