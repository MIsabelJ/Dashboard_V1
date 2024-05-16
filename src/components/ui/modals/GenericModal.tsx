
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { removeElementActive, setDataTable, setElementActive } from "../../../redux/slices/TablaReducer";
import { FactoryService } from "../../../services/FactoryService";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Entidades } from "../../../types/IBaseEntity";
import { Modal, Button } from "react-bootstrap";
import "./modal.css";

interface IModalProps<T extends Entidades> {
  modalTitle: string;
  formDetails: {
    initialValues: T;
    translatedPlaceholder: Record<string, string>;
    validationSchema: Yup.ObjectSchema<object>;
    formInputType: Record<string, string>;
  };
  openModal: boolean;
  setOpenModal: (state: boolean) => void;
  route: string;
  getItems: () => void;
}

export const GenericModal = <T extends Entidades>({
  modalTitle,
  formDetails,
  openModal,
  setOpenModal,
  route,
  getItems
}: IModalProps<T>) => {
  const handleClose = () => {
    setOpenModal(false);
    dispatch(removeElementActive());
  };

  const elementActive = useAppSelector(
    (state) => state.tableReducer.elementActive
  );



  // Invoca al servicio correspondiente según la ruta pasada por parámetro
  const itemService = FactoryService.createService(route);

  const handleSubmit = async (values: any) => {
    handleClose();
    if (elementActive) {
      await itemService.put(elementActive.element.id, values);
    } else {
      await itemService.post(values);
    }
    getItems();
  };

  const dispatch = useAppDispatch();

  return (
    <div>
      <Modal
        id={"modal"}
        show={openModal}
        onHide={handleClose}
        size={"lg"}
        backdrop="static"
        keyboard={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={formDetails.validationSchema}
            initialValues={formDetails.initialValues}
            enableReinitialize={true}
            onSubmit={async (values) => {
              await handleSubmit(values);
            }}
          >
            {({ setFieldValue }) => (
              <Form className="container_Form_Ingredientes">
                {/* Campos del formulario */}
                {Object.keys(formDetails.initialValues).map(
                  (key: string) =>
                    key !== "id" &&
                    key !== "active" &&
                    key !== "actions" && (
                      <Field
                        key={key}
                        label={key}
                        name={key}
                        type={formDetails.formInputType[key]}
                        placeholder={formDetails.translatedPlaceholder[key]}
                        value={formDetails.formInputType[key] == 'file' ? '' : elementActive?.element[key]}
                        onChange={(e: any) => {
                          setFieldValue(key, e.target.value);
                          if (elementActive) {
                            dispatch(setElementActive({ element: { ...elementActive.element, [key]: e.target.value } }));
                          }

                        }}
                      />
                    )
                )}
                {/* Botón para enviar el formulario */}
                <button type="submit" >Enviar</button>
              </Form>)}
          </Formik>
        </Modal.Body>
      </Modal>
    </div >
  );
};
