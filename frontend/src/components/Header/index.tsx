import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { eRoutes } from "../../enum/eRoutes";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { adminItemsToShow, drawerWidth, itemsToShow } from "./headers.helpers";
import { GlobalContext } from "../../context";

const SidePanel = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, dispatch } = useContext(GlobalContext);
  const [items, setItems] = useState(itemsToShow);
  const { role } = state as any;

  useEffect(() => {
    const cookie = document.cookie
      .split(";")
      .find((c) => c.includes("__msid"))
      ?.split("=")[1];
    const decodedCookie = atob(decodeURIComponent(cookie || ""));
    if (!role) {
      dispatch({ role: decodedCookie });
    }
  }, [document.cookie]);

  useEffect(() => {
    console.log(role, "role", role === "admin");
    if (role === "admin") {
      setItems([...items, ...adminItemsToShow]);
    }
  }, [role]);

  const [activeItem, setActiveItem] = useState<(typeof items)[number]["path"]>(
    eRoutes.PROFILE
  );

  const handleNavigation = (item: (typeof items)[number]) => {
    if (item.path) {
      navigate(item.path);
      setActiveItem(item.path);
    }
  };

  useEffect(() => {
    const path = location.pathname;
    const item = items.find((item) => item.path === path);
    if (item) {
      setActiveItem(item.path);
      return;
    }
  }, [location.pathname]);

  if (location.pathname === eRoutes.LOGIN) {
    return (
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          background: "rgb(250, 250, 251)",
          fontFamily: "inherit",
        }}
      >
        {children}
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Box sx={{ overflow: "auto" }}>
          <List>
            {items.map((item, index) => (
              <ListItem
                key={index}
                disablePadding
                sx={{ padding: "8px 0" }}
                onClick={() => handleNavigation(item)}
              >
                <ListItemButton selected={activeItem === item.path}>
                  <ListItemIcon
                    sx={{
                      minWidth: "30px",
                      [`& .MuiSvgIcon-root`]: {
                        width: "18px",
                      },
                    }}
                  >
                    <item.icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    sx={{
                      [`& .MuiTypography-root`]: {
                        fontSize: "14px",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          background: "rgb(250, 250, 251)",
          fontFamily: "inherit",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default SidePanel;
