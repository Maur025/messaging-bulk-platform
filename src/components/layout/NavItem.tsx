import type React from "react";

interface Props {
  icon: React.ReactNode;
  label: string;
  count?: string;
  active?: boolean;
  expanded: boolean;
}

const NavItem = ({ icon, label, count, active, expanded }: Props) => {
  return (
    <button
      type="button"
      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs transition-colors cursor-pointer ${active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"} ${expanded ? "" : "justify-center"}`}
      aria-current={active ? "page" : undefined}
      title={!expanded ? label : undefined}
    >
      <span className="[&>svg]:size-4">{icon}</span>

      {expanded && (
        <>
          <span className="flex-1">{label}</span>

          {count && (
            <span
              className={`rounded px-1.5 py-0.5 text-[10px] ${active ? "bg-primary-foreground/15" : "bg-muted"}`}
            >
              {count}
            </span>
          )}
        </>
      )}
    </button>
  );
};

export default NavItem;
