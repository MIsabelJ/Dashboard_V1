import { ReactNode, useEffect } from "react";
import { useAppSelector } from "../../../../hooks/redux";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Switch,
  Typography,
} from "@mui/material";
import { ButtonsTable } from "../../ButtonsTable/ButtonsTable";
import { SwitchButton } from "../../ButtonsTable/Switch";

interface IGenericAtribute<T> {
  label: string;
  key: string;
  render?: (item: T) => ReactNode;
}
export interface ICardProps<T> {
  handleClick: (id: number) => void;
  handleDelete: (id: number) => void;
  setOpenModal: (state: boolean) => void;
}

export const GenericCards = <T extends { id: number }>({
  handleClick,
  handleDelete,
  setOpenModal,
}: ICardProps<T>) => {
  const dataCard = useAppSelector((state) => state.tableReducer.dataTable);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '24px', gap: '16px' }}>
      {dataCard.map((item) => (
        <Card key={item.id} sx={{ width: 'calc(33.33% - 20px)', marginBottom: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', '&:hover': { boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)' } }}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              {item.name}
            </Typography>
            <SwitchButton id={item.id} currentState={item.active} />
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <img src="https://via.placeholder.com/150" alt="Imagen" style={{ width: '100px', height: '100px', marginRight: '20px' }} />
              <div>
                {item.description && (
                  <Typography variant="body2" gutterBottom>
                    Descripción: {item.description}
                  </Typography>
                )}
                {item.address && (
                  <Typography variant="body2" gutterBottom>
                    Dirección: {item.address}
                  </Typography>
                )}
              </div>
            </div>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => handleClick(item.id)}>Ver más</Button>
            <ButtonsTable el={item} handleDelete={handleDelete} setOpenModal={setOpenModal} />
          </CardActions>
        </Card>
      ))}
    </div>
  );
};
