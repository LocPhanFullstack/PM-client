"use client";

import React from "react";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useGetUsersQuery } from "@/src/api";
import { dataGridClassNames, dataGridSxStyles } from "@/src/configs/libs";
import { Loading } from "@/src/components";

const CustomToolbar = () => (
  <GridToolbarContainer className="toolbar flex gap-2">
    <GridToolbarFilterButton />
    <GridToolbarExport />
  </GridToolbarContainer>
);

const columns: GridColDef[] = [
  { field: "userId", headerName: "ID", width: 100 },
  { field: "username", headerName: "Username", width: 150 },
  {
    field: "profilePictureUrl",
    headerName: "Profile Picture",
    width: 200,
    renderCell: (params) => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-9 w-9">
          <Image
            src={`/${params.value}`}
            alt={params.row.username}
            width={100}
            height={50}
            className="h-full rounded-full object-cover"
          />
        </div>
      </div>
    ),
  },
];

export const UsersScreen = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();
  const { theme } = useTheme();

  if (isError || !users) return <div>Error fetching users</div>;

  return (
    <div className="flex w-full flex-col">
      {isLoading && (
        <Loading
          loadingStyle="clip-loader"
          cssOverride={{ marginTop: "20px" }}
          size={60}
        />
      )}
      <div style={{ height: 650, width: "100%" }}>
        <DataGrid
          rows={users || []}
          columns={columns}
          getRowId={(row) => row.userId}
          pagination
          slots={{
            toolbar: CustomToolbar,
          }}
          className={dataGridClassNames}
          sx={dataGridSxStyles(theme === "dark")}
        />
      </div>
    </div>
  );
};
