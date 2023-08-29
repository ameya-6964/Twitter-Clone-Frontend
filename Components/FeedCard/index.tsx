import React from "react";
import Image from "next/image";
import { BiMessageRounded, BiUpload } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";

const FeedCard: React.FC = () => {
  return (
    <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-5 hover:bg-slate-950 transition-all cursor-pointer">
      <div className="grid grid-cols-12 gap-2 ">
        <div className="col-span-1">
          <Image
            src="https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png"
            height={50}
            width={50}
            alt="Profile Picture"
          />
        </div>
        <div className="col-span-11">
          <h5>Ameya Belvalkar</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus
            vero nobis quo laboriosam hic quos veniam dolorem beatae voluptas
            modi?
          </p>
          <div className="flex justify-between mt-5 text-xl items-center p-2 w-[90%] ">
            <div>
              <BiMessageRounded />
            </div>
            <div>
              <FaRetweet />
            </div>
            <div>
              <AiOutlineHeart />
            </div>
            <div>
              <BiUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
