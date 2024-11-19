import {
  PiCaretCircleDownBold,
  PiCaretCircleUpBold,
  PiClockBold,
  PiCurrencyNgnBold,
  PiMapPinBold,
  PiStarFill,
  PiXBold,
} from "react-icons/pi";

const ActivityInfo = () => {
  return (
    <div className="h-[274px] flex">
      <div className="h-full rounded-l bg-white w-full p-4 flex items-center">
        <img
          src="https://cdn.dropp.cloud/aohwfn.png"
          alt=""
          className="h-full w-[232px] rounded"
        />
        <div className="flex flex-col justify-evenly h-full">
          <div className="flex justify-between">
            <div className="ml-4">
              <p className="text-xl font-semibold">The Museum of Modern Art</p>
              <p className="font-medium text-[#1D2433] text-sm my-1">
                Works from Van Gogh to Warhol & beyond plus a sculpture garden,
                2 cafes & The modern restaurant
              </p>
              <div className="flex items-center gap-x-4 text-sm">
                <button className="text-[#0D6EFD] flex items-center gap-x-1">
                  <PiMapPinBold />
                  Directions
                </button>
                <p className="flex items-center gap-x-1 text-[#676E7E]">
                  <PiStarFill color="#F4B93E" /> 4.5 (436)
                </p>
                <p className="flex items-center gap-x-1 text-[#676E7E]">
                  <PiClockBold />1 Hour
                </p>
              </div>
            </div>
            <div className="text-[#1D2433] ml-10">
              <p className="flex items-center gap-x-1 font-semibold text-xl">
                <PiCurrencyNgnBold color="#344054" />
                123,450.00
              </p>
              <p className="text-xs font-semibold whitespace-nowrap">
                10:30 AM on Mar 19
              </p>
            </div>
          </div>

          <div className="text-[#647995] border-y border-[#E4E7EC] py-5 font-medium flex justify-between items-center">
            <div className="px-5 flex text-xs gap-x-3">
              <p>What's Included:</p>
              <p>Admission to the Empire State Building</p>
              <button className="text-[#0D6EFD]">See more</button>
            </div>
            <div className="flex text-xs gap-x-2 items-center">
              <button className="text-xs font-medium text-white bg-[#0A369D] rounded px-3 py-2">
                Day 1 - (2)
              </button>
              <div className="flex items-center flex-col gap-y-2">
                <button>
                  <PiCaretCircleUpBold size={16} />
                </button>
                <button>
                  <PiCaretCircleDownBold size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-between items-center px-5 text-xs">
            <div className="flex items-center gap-x-3">
              <button className="font-medium text-[#0D6EFD]">
                Activity details
              </button>
              <button className="font-medium text-[#0D6EFD]">
                Price details
              </button>
            </div>
            <button className="font-medium text-[#0D6EFD]">Edit details</button>
          </div>
        </div>
      </div>
      <button className="h-full bg-[#FBEAE9] rounded-r flex items-center justify-center w-12">
        <PiXBold color="#9E0A05" size={24} />
      </button>
    </div>
  );
};

export default ActivityInfo;
