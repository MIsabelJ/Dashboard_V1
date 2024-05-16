import { useEffect, useState } from "react";
import { PromocionService } from "../../../services/PromocionService";
import { IPromocion } from "../../../types/IPromociones";
import { setDataTable } from "../../../redux/slices/TablaReducer";
import { useAppDispatch } from "../../../hooks/redux";
import Swal from "sweetalert2";
import GenericTable from "../../ui/Generic/GenericTable/GenericTable";
import { Loader } from "../../ui/Loader/Loader";
import { ModalPromocion } from "../../ui/modals/ModalPromociones/ModalPromocion";

const API_URL = import.meta.env.VITE_API_URL;

export const SeccionPromociones = () => {
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const promocionService = new PromocionService(API_URL + "/sales");
  const dispatch = useAppDispatch();

  const ColumnsPromocion = [
    {
      label: "id",
      key: "id",
      render: (promocion: IPromocion) => (promocion?.id ? promocion.id : 0),
    },
    {
      label: 'Imagen',
      key: 'image',
      render: (promocion: IPromocion) => (
        <img
          src={promocion.image}
          alt={promocion.name}
          style={{ maxWidth: '100px', maxHeight: '100px' }}
        />
      ),
    },
    {
      label: "Nombre",
      key: "name",
    },
    {
      label: "Desde",
      key: "since",
    },
    {
      label: "Hasta",
      key: "until",
    },
    {
      label: "Descripción",
      key: "description",
    },
    {
      label: "Precio",
      key: "price",
    },
    { label: "Acciones", key: "actions", },
    { label: "Estado", key: "active" }
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
        await promocionService.delete(id).then(() => {
          getPromocion();
        });
      }
    });
  };

  const getPromocion = async () => {
    const promocionData = await promocionService.getAll()
    dispatch(setDataTable(promocionData));
    setLoading(false);
  };


  useEffect(() => {
    setLoading(true);
    getPromocion();
  }, []);

  return (
    <>
      <div>
        <div
          style={{
            padding: ".4rem",
            display: "flex",
            justifyContent: "flex-end",
            width: "90%",
          }}
        >
        </div>
        {/* Mostrar indicador de carga mientras se cargan los datos */}
        {loading ? (
          <Loader />
        ) : (
          // Mostrar la tabla de personas una vez que los datos se han cargado
          <GenericTable<IPromocion>
            handleDelete={handleDelete}
            columns={ColumnsPromocion}
            setOpenModal={setOpenModal}
          />
        )}
      </div>
      <ModalPromocion
        openModal={openModal}
        setOpenModal={setOpenModal}
        getPromociones={getPromocion}
      />
    </>
  );
};

