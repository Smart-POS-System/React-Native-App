import React from "react";
import { expiredProducts } from "../helpers/list";
import ExpireItems from "./ExpireItems";

function ExpiredList() {
  return <ExpireItems list={expiredProducts} status="expired" />;
}

export default ExpiredList;
