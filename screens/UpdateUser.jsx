import UserForm from "../components/UserForm";

function UpdateUser({ navigation, route }) {
  const employee = route.params.employee;
  return <UserForm employee={employee} />;
}

export default UpdateUser;
