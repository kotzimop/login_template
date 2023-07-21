"use client";
import { useCallback, useState } from "react";
import { SafeUser } from "@/app/types";
import { signOut } from "next-auth/react";

import { AiOutlineMenu } from "react-icons/ai";

import Avatar from "@/components/Avatar";
import MenuItem from "@/components/navbar/MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

interface UserMenuProps {
  currentUser?: SafeUser | null;

}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {}}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Your Profile
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser?.emailVerified ? (
              <>
                <MenuItem onClick={() => {}} label="My Action" />
                {currentUser.role === "ADMIN" && (
                  <MenuItem
                    onClick={() => {
                      registerModal.onOpen()
                      toggleOpen()
                    }}
                    label="Register New User"
                  />
                )}
                <hr />
                <MenuItem onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={() => {
                  loginModal.onOpen()
                  toggleOpen()
                }} label="Login" />
                <MenuItem onClick={() => {
                  registerModal.onOpen()
                  toggleOpen()
                }} label="Sign Up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;