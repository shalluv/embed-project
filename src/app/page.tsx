import CardGroup from "@/components/CardGroup";
import SummaryChart from "@/components/SummaryChart";

export default function Home() {
  return (
    <main className="absolute left-1/2 top-0 flex w-full max-w-screen-lg -translate-x-1/2 flex-col gap-16 px-8 pb-24 pt-16 lg:px-0">
      <div className="flex h-24 w-full items-center justify-between border-b">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Dashboard
        </h1>
        {/* <ModeToggle /> */}
      </div>
      <SummaryChart />
      <CardGroup />
    </main>
  );
}
