import React, { useEffect, useState } from "react";
import { ManufacturadoService } from "../../../../services/ManufacturadoService";
import { useAppDispatch } from "../../../../hooks/redux";
import { setDataTable } from "../../../../redux/slices/TablaReducer";
import { IManufacturado } from "../../../../types/IManufacturado";
import Swal from "sweetalert2";
import * as Yup from 'yup';
import GenericTable from "../../../ui/Generic/GenericTable/GenericTable";
import { Loader } from "../../../ui/Loader/Loader";
import { GenericModal } from "../../../ui/modals/GenericModal";
// import { ModalManufacturado } from "../../ui/modals/ModalManufacturado/ModalManufacturado";

import "./manufacturados.css";

const API_URL = import.meta.env.VITE_API_URL;

export const SeccionManufacturados = () => {
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const manufacturadoService = new ManufacturadoService(API_URL + "/manufactured");
  const dispatch = useAppDispatch();

  // Necesario para establecer las columnas de la tabla genérica
  const ColumnsManufacturado = [
    {
      label: "id",
      key: "id",
      render: (manufacturado: IManufacturado) => (manufacturado?.id ? manufacturado.id : 0),
    },
    { label: "Nombre", key: "name" },
    { label: "Precio", key: "price" },
    { label: "Descripción", key: "description" },
    { label: "Categoría", key: "category" },
    {
      label: 'Imagen',
      key: 'image',
      render: (manufacturado: IManufacturado) => (
        <img
          src={manufacturado.image}
          alt={manufacturado.name}
          style={{ maxWidth: '100px', maxHeight: '100px' }}
        />
      ),
    },
    { label: "Stock", key: "stock" },
    {
      label: "Acciones", key: "actions",
    },
    { label: "Estado", key: "active" },
  ];

  // Necesario para el modal genérico con manufacturados
  const initialValues: IManufacturado = {
    id: 0,
    name: '',
    price: 0,
    description: '',
    category: '',
    image: '',
    stock: 0,
    actions: '',
    active: true,
  };

  //validación del formulario específico para manufacturados
  const validationSchema = Yup.object({
    name: Yup.string().required('Campo requerido'),
    price: Yup.number().required('Campo requerido').min(0, 'El precio debe ser mayor o igual a 0'),
    description: Yup.string().required('Campo requerido'),
    category: Yup.string().required('Campo requerido'),
    image: Yup.string().required('Campo requerido'),
    stock: Yup.number().required('Campo requerido').min(0, 'El stock debe ser mayor o igual a 0'),
  }) as Yup.ObjectSchema<object>;

  // Traducción de los placeholders del formulario de manufacturados
  const translatedPlaceholder = {
    name: 'Nombre',
    price: 'Precio',
    description: 'Descripción',
    category: 'Categoría',
    image: 'Imagen',
    stock: 'Stock',
  }

  // Englobamos todas las props referidas al formulario que vamos a pasarle al Modal genérico
  const formDetails = {
    validationSchema: validationSchema,
    initialValues: initialValues,
    translatedPlaceholder: translatedPlaceholder,
    formInputType: {
      name: 'text',
      price: 'number',
      description: 'text',
      category: 'text',
      image: 'file',
      stock: 'number',
    },
  }

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
        await manufacturadoService.logicDelete(id).then(() => {
          getManufacturado();
        });
      }
    });
  };

  const getManufacturado = async () => {
    await manufacturadoService.getAll().then((manufacturadoData) => {
      // console.log(manufacturadoData)
      dispatch(setDataTable(manufacturadoData));
      setLoading(false);
    });
  };

  useEffect(() => {
    setLoading(true);
    getManufacturado();
  }, []);

  return (
    <>
      {/* Mostrar indicador de carga mientras se cargan los datos */}
      {loading ? (
        <Loader />
      ) : (
        // Mostrar la tabla de personas una vez que los datos se han cargado
        <div style={{ height: "85vh" }}>
          <GenericTable<IManufacturado>
            handleDelete={handleDelete}
            columns={ColumnsManufacturado}
            setOpenModal={setOpenModal}
          />
        </div>
      )}
      <GenericModal
        modalTitle={"Manufacturado"}
        formDetails={formDetails}
        openModal={openModal}
        setOpenModal={setOpenModal}
        route="manufactured"
        getItems={getManufacturado} />

      {/* <ModalManufacturado Modal individual de manufacturados
        getManufacturados={getManufacturado}
        openModal={openModal}
        setOpenModal={setOpenModal}
      /> */}
    </>
  );
};
