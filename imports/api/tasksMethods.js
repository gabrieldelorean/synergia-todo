import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { TasksCollection } from "../db/TasksCollection";
import SimpleSchema from "simpl-schema";

SimpleSchema.defineValidationErrorTransform((error) => {
  const ddpError = new Meteor.Error(error.message);
  ddpError.error = "validation-error";
  ddpError.details = error.details;
  return ddpError;
});

const createSchema = new SimpleSchema(
  {
    name: { type: String },
    author: { type: String },
    description: { type: String },
    date: { type: Date },
  },
  { check }
);

const editSchema = new SimpleSchema(
  {
    name: { type: String },
    description: { type: String },
    date: { type: Date },
  },
  { check }
);

const statusSchema = new SimpleSchema(
  {
    status: {
      type: String,
      allowedValues: ["cadastrada", "em-andamento", "concluida"],
    },
  },
  { check }
);

Meteor.methods({
  "tasks.insert"({ name, author, description, date }) {
    createSchema.validate({ name, author, description, date });

    if (!this.userId) throw new Meteor.Error("Not authorized.");

    TasksCollection.insert({
      userId: this.userId,
      author,
      name,
      description,
      status: "cadastrada",
      isPrivate: true,
      date,
      createdAt: new Date(),
    });
  },

  "tasks.remove"(taskId) {
    check(taskId, String);

    if (!this.userId) throw new Meteor.Error("Not authorized.");

    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

    if (!task) throw new Meteor.Error("Access denied");

    TasksCollection.remove(taskId);
  },

  "tasks.edit"(taskUpdated) {
    const { _id, name, description, date, isPrivate } = taskUpdated;

    editSchema.validate({ name, description, date });

    check(_id, String);

    if (!this.userId) throw new Meteor.Error("Not authorized");

    const task = TasksCollection.findOne({ _id, userId: this.userId });

    if (!task) throw new Meteor.Error("Access denied");

    TasksCollection.update(_id, {
      $set: { name, description, date, isPrivate, updatedAt: new Date() },
    });
  },

  "tasks.changeStatus"(taskId, status) {
    check(taskId, String);

    statusSchema.validate({ status });

    if (!this.userId) throw new Meteor.Error("Not authorized.");

    const task = TasksCollection.findOne({ _id: taskId });

    if (!task) throw new Meteor.Error("Access denied");

    TasksCollection.update(taskId, { $set: { status } });
  },
});
