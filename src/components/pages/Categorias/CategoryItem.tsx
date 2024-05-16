import React from "react";
import { ICategories } from "../../../types/ICategories";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import { IconButton, List } from "@mui/material";
import { EditRounded } from "@mui/icons-material";
import { SwitchButton } from "../../ui/ButtonsTable/Switch";
import "./category.css";

interface CategoryItemProps {
  category: ICategories;
  padding: number;
}

export const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  padding,
}) => {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => setOpen(!open);

  return (
    <div>
      <ListItemButton sx={{ pl: padding }}>
        <ListItemIcon>
          <GridViewOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary={category.name} />
        <div style={{ padding: "10px" }}>
          <IconButton color="primary">
            <EditRounded />
          </IconButton>
          <SwitchButton id={category.id} currentState={category.active} />
        </div>
        {category.subcategories && category.subcategories.length > 0 ? (
          open ? (
            <ExpandLess onClick={handleClick} />
          ) : (
            <ExpandMore onClick={handleClick} />
          )
        ) : null}
      </ListItemButton>
      {category.subcategories && category.subcategories.length > 0 && (
        <>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {category.subcategories.map((subcategory) => (
                <CategoryItem
                  key={subcategory.id}
                  category={subcategory}
                  padding={padding ? padding + 4 : 4}
                />
              ))}
            </List>
          </Collapse>
        </>
      )}
    </div>
  );
};
