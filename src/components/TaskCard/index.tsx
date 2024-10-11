import { ITask } from "@/src/shared/types";
import Image from "next/image";
import { TaskContent } from "./components";
import { Card } from "../DataDisplay";

type Props = {
  task: ITask;
};

export const TaskCard = ({ task }: Props) => {
  return (
    <Card>
      {task && task.attachments && task.attachments.length > 0 && (
        <div>
          <strong>Attachments: </strong>
          <div className="flex flex-wrap">
            <Image
              src={`/${task.attachments[0].fileURL}`}
              alt={task.attachments[0].fileName}
              width={400}
              height={200}
              className="rounded-md w-full"
            />
          </div>
        </div>
      )}
      <TaskContent task={task} />
    </Card>
  );
};
