import React from "react";
import { BsTwitter, BsBell, BsEnvelope, BsBookmark } from "react-icons/bs";
import { BiHomeCircle, BiHash, BiUser } from "react-icons/bi";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
}

const sideBarMenuItems: TwitterSidebarButton[] = [
  {
    title: "Home",
    icon: <BiHomeCircle />,
  },
  {
    title: "Explore",
    icon: <BiHash />,
  },
  {
    title: "Notification",
    icon: <BsBell />,
  },
  {
    title: "Messages",
    icon: <BsEnvelope />,
  },
  {
    title: "Bookmark",
    icon: <BsBookmark />,
  },
  {
    title: "Profile",
    icon: <BiUser />,
  },
];

export default function Home() {
  return (
    <div className={inter.className}>
      <div className="grid grid-cols-12 h-screen w-screen px-56">
        <div className=" col-span-3 pt-8 px-4">
          <div className="text-4xl h-fit hover:bg-gray-600 rounded-full p-4 transition-all cursor-pointer w-fit">
            <BsTwitter />
          </div>
          <div className="mt-2 text-2xl font-semibold pr-4">
            <ul>
              {sideBarMenuItems.map((item) => (
                <li
                  className="flex justify-start items-center gap-4  hover:bg-gray-800 rounded-full px-5 py-2 w-fit mt-3"
                  key={item.title}
                >
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 px-3">
              <button className="bg-[#1d9bf0] text-lg p-4 rounded-full w-full hover:bg-[#1dd4f0] transition-all cursor-pointer">
                Tweet
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-6 border-r-[1px] border-l-[1px] border-grey-400"></div>
        <div className="col-span-3"></div>
      </div>
    </div>
  );
}
