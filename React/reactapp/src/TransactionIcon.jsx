import React from "react";
//import { IconType } from "react-icons/ci";
const TransactionIcon = ({ icon, size = 20 }) => {
  const DynamicIcon = icon;

  return <DynamicIcon size={size} />;
};

export default TransactionIcon;
