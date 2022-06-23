import { Meteor } from "meteor/meteor";
import { TasksCollection } from "../db/TasksCollection";

Meteor.publish(
  "tasks",
  function publishTasks(ClientFilter, userTaskLimit = 0, userTaskSkip = 0) {
    const tasks = TasksCollection.find(
      {
        $and: [
          { $or: [{ userId: this.userId }, { isPrivate: false }] },
          ClientFilter,
        ],
      },
      { limit: userTaskLimit, skip: userTaskSkip }
    );

    return tasks;
  }
);
