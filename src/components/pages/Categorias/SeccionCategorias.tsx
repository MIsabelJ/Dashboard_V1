import * as React from "react";
import { CategoryItem } from "./CategoryItem";
import { useEffect, useState } from "react";
import { ICategories } from "../../../types/ICategories";
import List from "@mui/material/List";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Loader } from "../../ui/Loader/Loader";
import { CategoriaService } from "../../../services/CategoriaService";

const API_URL = import.meta.env.VITE_API_URL;

export function SeccionCategorias() {
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [loading, setLoading] = useState(true);

  const categoriaService = new CategoriaService(API_URL + "/categories");

  const getCategoria = async () => {
    try {
      const categoriaData = await categoriaService.getAll();
      setCategories(categoriaData);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategoria();
  }, []);

  return (
    <div style={{ paddingTop: "30px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "right",
          paddingRight: "20px",
        }}
      >
        <IconButton
          color="primary"
          aria-label="add"
          // onClick={() => {
          //   setOpenModal(true);
          // }}
        >
          <AddIcon />
        </IconButton>
      </div>
      {!loading && Array.isArray(categories) && categories.length > 0 ? (
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          {categories.map((category) => (
            <CategoryItem key={category.id} category={category} padding={2} />
          ))}
        </List>
      ) : (
        <Loader />
      )}
    </div>
  );
}
