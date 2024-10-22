import { expiredProducts } from "../helpers/list";
import ExpireItems from "./ExpireItems";

function ExpiringList() {
  return <ExpireItems list={expiredProducts} status="expiring" />;
}

export default ExpiringList;
