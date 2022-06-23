import React from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutes = () => {
  const user = useTracker(() => Meteor.user());
  return user ? <Outlet /> : <Navigate to="/" />;
};
