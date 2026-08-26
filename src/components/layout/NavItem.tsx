import type React from "react";
import { NavLink } from "react-router";

interface Props {
  icon: React.ReactNode;
  label: string;
  count?: string;
  expanded: boolean;
  path: string;
}

const NavItem = ({ icon, label, count, expanded, path }: Props) => {
  return (
    <NavLink
      to={path}
      type="button"
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs transition-colors cursor-pointer ${isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"} ${expanded ? "" : "justify-center"}`
      }
      aria-current="page"
      title={!expanded ? label : undefined}
    >
      {({ isActive }) => (
        <>
          <span className="[&>svg]:size-4">{icon}</span>

          {expanded && (
            <>
              <span className="flex-1">{label}</span>

              {count && (
                <span
                  className={`rounded px-1.5 py-0.5 text-[10px] ${isActive ? "bg-primary-foreground/15" : "bg-muted"}`}
                >
                  {count}
                </span>
              )}
            </>
          )}
        </>
      )}
    </NavLink>
  );
};

export default NavItem;
