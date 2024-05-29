import { ChildrenProp } from "../interfaces/types";

function Navbar({ children }: ChildrenProp) {
  return <nav className="nav-bar">{children}</nav>;
}

export default Navbar;
