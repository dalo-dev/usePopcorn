import { ChildrenProp } from "../interfaces/types";

function Main({ children }: ChildrenProp) {
  return <main className="main">{children}</main>;
}

export default Main;
