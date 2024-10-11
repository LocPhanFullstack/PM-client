import { IProject } from "@/src/shared/types";
import React from "react";
import { Card } from "../DataDisplay";

type Props = {
  project: IProject;
};

export const ProjectCard = ({ project }: Props) => {
  return (
    <Card>
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <p>Start Date: {project.startDate}</p>
      <p>End Date: {project.endDate}</p>
    </Card>
  );
};
