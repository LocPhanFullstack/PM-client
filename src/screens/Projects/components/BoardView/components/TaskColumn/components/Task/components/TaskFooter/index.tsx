import { ITask } from "@/src/shared/types";
import { MessageSquare } from "lucide-react";
import Image from "next/image";

export const TaskFooter = ({ task }: { task: ITask }) => {
  const numberOfComments = (task.comments && task.comments.length) || 0;

  return (
    <>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex -space-x-[6px] overflow-hidden">
          {task.assignee && (
            <Image
              src={`/${task.assignee.profilePictureUrl}`}
              alt={task.assignee.username}
              key={task.assignee.userId}
              width={30}
              height={30}
              className="h-8 w-8 rounded-full border-2 border-background object-cover"
            />
          )}
          {task.author && (
            <Image
              src={`/${task.author.profilePictureUrl}`}
              alt={task.author.username}
              key={task.author.userId}
              width={30}
              height={30}
              className="h-8 w-8 rounded-full border-2 border-background object-cover"
            />
          )}
        </div>
        <div className="flex items-center cursor-pointer">
          <MessageSquare size={20} />
          <span className="ml-1 text-sm">{numberOfComments}</span>
        </div>
      </div>
    </>
  );
};
