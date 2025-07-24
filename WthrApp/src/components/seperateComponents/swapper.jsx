export default function Swapper({ swapper, setSwapper }) {
  const swapperFunc = () => {
    setSwapper(!swapper);
  };

  return (
    <div
      onClick={swapperFunc}
      className="flex flex-row gap-x-[25px] text-[28px] cursor-pointer select-none"
    >
      <div className={swapper ? "font-semibold" : "font-extralight"}>Today</div>
      <div className={swapper ? "font-extralight" : "font-semibold "}>
        Tomorrow
      </div>
    </div>
  );
}
