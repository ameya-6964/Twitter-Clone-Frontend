import React, { useCallback } from "react";
import { BsTwitter, BsBell, BsEnvelope, BsBookmark } from "react-icons/bs";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { BiHomeCircle, BiHash, BiUser, BiMoney } from "react-icons/bi";
import { SlOptions } from "react-icons/sl";
import FeedCard from "@/Components/FeedCard";
import toast from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";

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
    title: "Twitter Blue",
    icon: <BiMoney />,
  },
  {
    title: "Profile",
    icon: <BiUser />,
  },
  {
    title: "More Actions",
    icon: <SlOptions />,
  },
];

export default function Home() {
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();

  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) {
        return toast.error("Google Token Not Found");
      }
      const { verifyGoogleToken } = await graphqlClient.request(
        verifyUserGoogleTokenQuery,
        {
          token: googleToken,
        }
      );
      toast.success("Verified Success");
      // console.log(verifyGoogleToken);

      if (verifyGoogleToken) {
        window.localStorage.setItem("__twitter_token", verifyGoogleToken);
      }
      await queryClient.invalidateQueries(["curent-user"]);
    },
    [queryClient]
  );
  return (
    <div>
      <div className="grid grid-cols-12 h-screen px-56">
        <div className=" col-span-4 pt-1 ml-15">
          <div className="text-2xl h-fit hover:bg-gray-600 rounded-full p-4 transition-all cursor-pointer w-fit">
            <BsTwitter />
          </div>
          <div className="mt-4 text-xl font-semibold pr-4">
            <ul>
              {sideBarMenuItems.map((item) => (
                <li
                  className="flex justify-start items-center gap-4  hover:bg-gray-800 rounded-full px-3 py-3 w-fit mt-3"
                  key={item.title}
                >
                  <span className="text-3xl">{item.icon}</span>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 px-3">
              <button
                className="bg-[#1d9bf0] text-lg py-2 px-4 rounded-full w-full 
              hover:bg-[#1dd4f0] transition-all cursor-pointer"
              >
                Tweet
              </button>
            </div>
          </div>
          {user && (
            <div className="mt-5 flex gap-3 items-center">
              {user && user.profileImageURL && (
                <Image
                  src={user?.profileImageURL}
                  alt={user.firstname}
                  height={50}
                  width={50}
                  className="rounded-full"
                />
              )}
              <div>
                <h3 className="text-xl">
                  {user.firstname} {user.lastname}
                </h3>
              </div>
            </div>
          )}
        </div>
        <div className="col-span-6 border-r-[1px] border-l-[1px] h-screen overflow-y-scroll no-scrollbar border-gray-600">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className="col-span-2 p-5">
          {!user && (
            <div className="rounded-lg">
              <h1 className="my-3 text-2xl font-bold">New To Twitter?</h1>
              <GoogleLogin onSuccess={handleLoginWithGoogle} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
