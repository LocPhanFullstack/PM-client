"use client";

import { useSearchQuery } from "@/src/api";
import { Loading, ProjectCard, TaskCard, UserCard } from "@/src/components";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";

export const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: searchResults,
    isLoading,
    isError,
  } = useSearchQuery(searchTerm, {
    skip: searchTerm.length < 3,
  });

  const handleSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    500
  );

  useEffect(() => {
    return handleSearch.cancel;
  }, [handleSearch.cancel]);

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search..."
          className="w-1/2 rounded p-3 shadow"
          onChange={handleSearch}
        />
      </div>
      <div className="py-4">
        {isLoading && (
          <Loading
            loadingStyle="clip-loader"
            cssOverride={{ marginTop: "20px" }}
            size={60}
          />
        )}
        {isError && <p>Error occurred while fetching search results.</p>}
        {!isLoading && !isError && searchResults && (
          <div className="flex flex-col gap-4">
            {searchResults.tasks && searchResults.tasks?.length > 0 && (
              <h2 className="">Tasks</h2>
            )}
            {searchResults.tasks?.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}

            {searchResults.projects && searchResults.projects?.length > 0 && (
              <h2 className="">Projects</h2>
            )}
            {searchResults.projects?.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}

            {searchResults.users && searchResults.users?.length > 0 && (
              <h2 className="">Users</h2>
            )}
            {searchResults.users?.map((user) => (
              <UserCard key={user.userId} user={user} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
