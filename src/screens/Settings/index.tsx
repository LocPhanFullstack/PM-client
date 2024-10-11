import { Card } from "@/src/components/DataDisplay";
import React from "react";

export const SettingsScreen = () => {
  const userSettings = {
    username: "johndoe",
    email: "john.doe@example.com",
    teamName: "Development Team",
    roleName: "Developer",
  };

  const labelStyles = "block text-sm font-medium dark:text-white";
  const textStyles =
    "mt-1 block w-full rounded-md shadow-sm p-2 bg-content-surface";

  return (
    <Card>
      <div className="space-y-4">
        <div className="space-y-3">
          <label className={labelStyles}>Username</label>
          <div className={textStyles}>{userSettings.username}</div>
        </div>
        <div className="space-y-3">
          <label className={labelStyles}>Email</label>
          <div className={textStyles}>{userSettings.email}</div>
        </div>
        <div className="space-y-3">
          <label className={labelStyles}>Team</label>
          <div className={textStyles}>{userSettings.teamName}</div>
        </div>
        <div className="space-y-3">
          <label className={labelStyles}>Role</label>
          <div className={textStyles}>{userSettings.roleName}</div>
        </div>
      </div>
    </Card>
  );
};
