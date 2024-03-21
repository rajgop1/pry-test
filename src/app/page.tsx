import PryCalculator from "@/components/pry-calculator";


export default function Home() {
  return (
    <main className="px-[24px] py-[10px]">
      <div className="flex flex-col gap-[10px]">
        <h1 className="text-2xl font-bold py-[10px]">Pry Calculator Clone</h1>
        <div className="h-[1px] w-full bg-gray-300"></div>
        <PryCalculator />
      </div>
    </main>
  );
}
