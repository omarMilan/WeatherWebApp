export default function InfoBoxOne({ Title, number, extra }) {
  return (
    <div className="rounded-[26px] w-full max-w-[720px] h-[160px] bg-Primary flex flex-col gap-y-[10px] border-4 border-Primary transition-all duration-200 hover:border-white items-start text-white justify-center">
      <div className="ml-[25px] text-[18px]">{Title || "Title"}</div>
      <div className="ml-[25px] text-[22px] font-semibold">
        {number || "Number"}
      </div>
      <div className="ml-[25px] text-[18px]">{extra}</div>
    </div>
  );
}
