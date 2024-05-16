import React, { useEffect, useState } from "react";
import { InsumoService } from "../../../../services/InsumoService";
import { useAppDispatch } from "../../../../hooks/redux";
import { setDataTable } from "../../../../redux/slices/TablaReducer";
import { IInsumo } from "../../../../types/IInsumo";
import Swal from "sweetalert2";
import GenericTable from "../../../ui/Generic/GenericTable/GenericTable";
import { Loader } from "../../../ui/Loader/Loader";

import "./insumos.css";
import { ModalInsumo } from "../../../ui/modals/ModalArticulos/ModalInsumos";

const API_URL = import.meta.env.VITE_API_URL;

export const SeccionInsumos = () => {
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const insumoService = new InsumoService(API_URL + "/supplies");
  const dispatch = useAppDispatch();

  // Necesario para establecer las columnas de la tabla genérica
  const ColumnsInsumo = [
    {
      label: "id",
      key: "id",
      render: (insumo: IInsumo) => (insumo?.id ? insumo.id : 0),
    },
    { label: "Nombre", key: "name" },
    { label: "Precio", key: "price" },
    { label: "Descripción", key: "description" },
    { label: "Categoría", key: "category" },
    {
      label: "Es ingrediente",
      key: "isIngredient",
      render: (insumo: IInsumo) => (insumo.isIngredient ? "Sí" : "No"),
    },
    {
      label: "Imagen",
      key: "image",
      render: (insumo: IInsumo) => (
        <img
          src={insumo.image}
          alt={insumo.name}
          style={{ maxWidth: "100px", maxHeight: "100px" }}
        />
      ),
    },
    { label: "Stock", key: "stock" },
    { label: "Acciones", key: "actions" },
    { label: "Estado", key: "active" },
  ];

  const handleDelete = async (id: number) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: `¿Seguro que quieres eliminar?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await insumoService.logicDelete(id).then(() => {
          getInsumo();
        });
      }
    });
  };

  const getInsumo = async () => {
    await insumoService.getAll().then((insumoData) => {
      // console.log(insumoData)
      dispatch(setDataTable(insumoData));
      setLoading(false);
    });
  };

  useEffect(() => {
    setLoading(true);
    getInsumo();
  }, []);

  return (
    <>
      {/* Mostrar indicador de carga mientras se cargan los datos */}
      {loading ? (
        <Loader />
      ) : (
        // Mostrar la tabla de personas una vez que los datos se han cargado
        <div style={{ height: "85vh" }}>
          <GenericTable<IInsumo>
            handleDelete={handleDelete}
            columns={ColumnsInsumo}
            setOpenModal={setOpenModal}
          />
        </div>
      )}
      {/* <GenericModal
        modalTitle={"Insumo"}
        formDetails={formDetails}
        openModal={openModal}
        setOpenModal={setOpenModal}
        route="supplies"
        getItems={getInsumo} /> */}

      <ModalInsumo
        getInsumos={getInsumo}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
};
