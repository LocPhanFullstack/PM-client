"use client";

import React from "react";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { useGetTeamsQuery } from "@/src/api";
import { useTheme } from "next-themes";
import { dataGridClassNames, dataGridSxStyles } from "@/src/configs/libs";
import { Loading } from "@/src/components";

const CustomToolbar = () => (
  <GridToolbarContainer className="toolbar flex gap-2">
    <GridToolbarFilterButton />
    <GridToolbarExport />
  </GridToolbarContainer>
);

const columns: GridColDef[] = [
  { field: "id", headerName: "Team ID", width: 100 },
  { field: "teamName", headerName: "Team Name", width: 200 },
  { field: "productOwnerUsername", headerName: "Product Owner", width: 200 },
  {
    field: "projectManagerUsername",
    headerName: "Project Manager",
    width: 200,
  },
];

export const TeamsScreen = () => {
  const { data: teams, isLoading, isError } = useGetTeamsQuery();
  const { theme } = useTheme();

  console.log(teams);

  if (isError || !teams) return <div>Error fetching teams</div>;

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
          rows={teams || []}
          columns={columns}
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
