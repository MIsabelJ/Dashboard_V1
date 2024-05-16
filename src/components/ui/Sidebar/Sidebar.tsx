import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setCurrentSection } from "../../../redux/slices/SectionReducer";
import { SeccionInicio } from "../../pages/Inicio/SeccionInicio";
// import { SeccionArticulos } from "../../pages/Articulos/SeccionArticulos";
import { SeccionInsumos } from "../../pages/Articulos/Insumos/SeccionInsumos";
import { SeccionManufacturados } from "../../pages/Articulos/Manufacturados/SeccionManufacturados";
import { SeccionCategorias } from "../../pages/Categorias/SeccionCategorias";
import { SeccionPromociones } from "../../pages/Promociones/SeccionPromociones";
// import { SeccionEmpresa } from "../../pages/Empresa/SeccionEmpresa";
import { SeccionUsuarios } from "../../pages/Usuarios/SeccionUsuarios";
import SeccionSucursal from "../../pages/Sucursal/SeccionSucursal";

import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CategoryIcon from "@mui/icons-material/Category";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
// import DomainIcon from "@mui/icons-material/Domain";
import StoreIcon from '@mui/icons-material/Store';
import GroupIcon from "@mui/icons-material/Group";
import { AccountCircle, ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

// ----------------------------------------------CODIGO POR NOSOTROS------------------------------------------------

// Definición de interfaces para los elementos del menú lateral
interface IDashboardItem {
  text: string;
  icon: JSX.Element;
  subItems?: IDashboardItem[];
}

interface IDashboard {
  list: IDashboardItem[];
}

// Definición de los elementos del menú principal y sus submenús
const dashboardItems: IDashboard = {
  list: [
    {
      text: "Inicio",
      icon: <DashboardIcon />,
    },
    {
      text: "Artículos",
      icon: <ShoppingBagIcon />,
      subItems: [
        {
          text: "Manufacturados",
          icon: <ShoppingBagIcon />,
        },
        {
          text: "Insumos",
          icon: <ShoppingBagIcon />,
        },
      ],
    },
    {
      text: "Categorías",
      icon: <CategoryIcon />,
    },
    {
      text: "Promociones",
      icon: <LocalOfferIcon />,
    },
    // {
    //   text: "Empresa",
    //   icon: <DomainIcon />,
    // },
    {
      text: "Sucursales",
      icon: <StoreIcon />
    },
    {
      text: "Usuarios",
      icon: <GroupIcon />,
    },
  ],
};

//-------------------------------------------------------------------------------------------------------------

// COMPONENTE PRINCIPAL
export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [openSubMenu, setOpenSubMenu] = React.useState<{
    [key: string]: boolean;
  }>({});

  const handleSubMenuClick = (text: string) => {
    setOpenSubMenu((prevState) => ({
      ...prevState,
      [text]: !prevState[text],
    }));
  };

  // --------------------------------- CARGAR ESTADO 'SECTION' -------------------------------
  // Manejo del estado de la sección actual
  const currentSection: string = useAppSelector(
    (state) => state.sectionReducer.sectionActual
  );
  const dispatch = useAppDispatch();

  const [section, setSection] = React.useState<string>("Inicio");

  //Actualiza el estado de redux de 'currentSection' al cambiar de sección
  React.useEffect(() => {
    setSection(currentSection);
  }, [currentSection]);

  const handleSectionChange = (newSection: string) => {
    setSection(newSection);
    dispatch(setCurrentSection(newSection));
  };

  // Función para renderizar la sección correspondiente en función del estado actual
  const dashboardSection = (seccionActual: string) => {
    switch (seccionActual) {
      case "Inicio":
        return <SeccionInicio setSection={setSection} />;
      case "Artículos":
        return <h2>Artículos</h2>;
      // TODO: Renderizar dos botones que redirijan a las secciones Manufacturados e Insumos, o no renderizar nada.
      case "Manufacturados":
        return <SeccionManufacturados />;
      case "Insumos":
        return <SeccionInsumos />;
      case "Categorías":
        return <SeccionCategorias />;
      case "Promociones":
        return <SeccionPromociones />;
      // case "Empresa":
      //   return <SeccionEmpresa />;
      case "Sucursales":
        return <SeccionSucursal />;
      case "Usuarios":
        return <SeccionUsuarios />;
    }
  };

  // Estado y manejo de la selección de sucursal (menú desplegable)

  const [branch, setBranch] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setBranch(event.target.value as string);
  };
  // -----------------------------------------------------

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", width: "100vw", height: "100vh" }}>
      <CssBaseline />
      <AppBar style={{ zIndex: 1000 }} position="fixed" open={open}>
        {/* Navbar */}
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      {/* Sidebar */}
      <Drawer
        style={{ zIndex: 100 }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {/* Usuario y selección de sucursal */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          <IconButton
            aria-label="user"
            color="primary"
            onClick={() => {
              handleSectionChange("Usuarios");
            }}
          >
            <AccountCircle fontSize="large" />
          </IconButton>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">Sucursal</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={branch}
              label="Branch"
              onChange={handleChange}
            >
              <MenuItem value={10}>Sucursal 1</MenuItem> {/* TODO: Renderizar sucursales */}
              <MenuItem value={20}>Sucursal 2</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Divider />
        <List>
          {/* recorre y renderiza la lista de secciones */}
          {dashboardItems.list.map(({ text, icon, subItems }, index) => (
            <div key={index}>
              <ListItem
                onClick={() => {
                  handleSectionChange(text);
                  if (subItems) {
                    handleSubMenuClick(text);
                  }
                }}
                disablePadding
              >
                <ListItemButton>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                  {subItems &&
                    (openSubMenu[text] ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
              </ListItem>
              {subItems && (
                <Collapse in={openSubMenu[text]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {subItems.map((subItem, subIndex) => (
                      <ListItem
                        key={`${index}-${subIndex}`}
                        onClick={() => handleSectionChange(subItem.text)}
                        disablePadding
                        sx={{ pl: 4 }}
                      >
                        <ListItemButton>
                          <ListItemIcon>{subItem.icon}</ListItemIcon>
                          <ListItemText primary={subItem.text} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </div>
          ))}
        </List>
      </Drawer>
      <Main style={{ marginTop: "36px" }} open={open}>
        {dashboardSection(section)}
      </Main>
    </Box>
  );
}
