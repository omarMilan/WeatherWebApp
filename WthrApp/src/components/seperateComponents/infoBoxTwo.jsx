export default function InfoBoxTwo({ Title, number, extra }) {
  return (
    <div className="rounded-[26px] w-full max-w-[720px] h-[160px] bg-Primary flex flex-col gap-y-[10px] border-4 border-Primary transition-all duration-200 hover:border-white items-start text-white justify-center">
      <div className="ml-[25px] text-[18px]">{Title || "Title"}</div>
      <div className="gap-y-[5px]">
        <div className="ml-[25px] text-[18px] ">{number}</div>
        <div className="ml-[25px] text-[18px]">{extra || "Extra"}</div>
      </div>
    </div>
  );
}
