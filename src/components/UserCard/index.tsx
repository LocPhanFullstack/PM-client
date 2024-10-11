import { IUser } from "@/src/shared/types";
import Image from "next/image";
import React from "react";
import { Card } from "../DataDisplay";

type Props = {
  user: IUser;
};

export const UserCard = ({ user }: Props) => {
  return (
    <Card>
      {user.profilePictureUrl && (
        <Image
          src={user.profilePictureUrl}
          alt="profile picture"
          width={32}
          height={32}
          className="rounded-full"
        />
      )}
      <div>
        <h3>{user.username}</h3>
        <p>{user.email}</p>
      </div>
    </Card>
  );
};
