import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IProject,
  ISearchResponse,
  ITask,
  ITeam,
  IUser,
} from "../shared/types";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),
  reducerPath: "api",
  tagTypes: ["Projects", "Tasks", "Users", "Teams"],
  endpoints: (build) => ({
    getProjects: build.query<IProject[], void>({
      query: () => "projects",
      providesTags: ["Projects"],
    }),
    createProject: build.mutation<IProject, Partial<IProject>>({
      query: (project) => ({
        url: "projects",
        method: "POST",
        body: project,
      }),
      invalidatesTags: ["Projects"], // To make sure you'll always have the most current data
    }),
    getTasks: build.query<ITask[], { projectId: number }>({
      query: ({ projectId }) => `tasks?projectId=${projectId}`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Tasks" as const, id }))
          : [{ type: "Tasks" as const }],
    }),
    getTasksByUser: build.query<ITask[], number>({
      query: (userId) => `tasks/user/${userId}`,
      providesTags: (result, error, userId) =>
        result
          ? result.map(({ id }) => ({ type: "Tasks", id }))
          : [{ type: "Tasks", id: userId }],
    }),
    createTask: build.mutation<ITask, Partial<ITask>>({
      query: (task) => ({
        url: "tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTaskStatus: build.mutation<ITask, { taskId: number; status: string }>(
      {
        query: ({ taskId, status }) => ({
          url: `tasks/${taskId}/status`,
          method: "PATCH",
          body: { status },
        }),
        //Just update a specific task. Don't have to refresh all the tasks
        invalidatesTags: (result, error, { taskId }) => [
          { type: "Tasks", id: taskId },
        ],
      }
    ),
    getUsers: build.query<IUser[], void>({
      query: () => "users",
      providesTags: ["Users"],
    }),
    getTeams: build.query<ITeam[], void>({
      query: () => "teams",
      providesTags: ["Teams"],
    }),
    search: build.query<ISearchResponse, string>({
      query: (query) => `search?query=${query}`,
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskStatusMutation,
  useGetUsersQuery,
  useGetTasksByUserQuery,
  useSearchQuery,
  useGetTeamsQuery,
} = api;
