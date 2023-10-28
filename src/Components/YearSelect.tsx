import React, { useState } from "react";
import { Menu, MenuItem } from "@material-ui/core";

interface IProps {
  renderOpener: (onClick: (event: React.MouseEvent<HTMLButtonElement>) => void) => void;
  onSelect: (year: number) => void;
}

export const initialYear = 2021;
export const currentYear = new Date().getMonth() < 8 ? new Date().getFullYear() - 1 : new Date().getFullYear();

export default function YearSelect({ renderOpener, onSelect }: IProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  return (
    <>
      {renderOpener((e) => setAnchorEl(e.currentTarget))}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {Array.from(Array(currentYear - initialYear + 1).keys(), (i) => currentYear - i).map((year) => (
          <MenuItem
            key={year}
            onClick={() => {
              onSelect(year);
              setAnchorEl(null);
            }}
          >
            {year}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
