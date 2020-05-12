import { action, thunk } from "easy-peasy";
import request from "../services/request";

export type Ticket = {
  tipo_de_acolhimento: string;
  status_inscricao: string;
  status_acolhimento: string;
  ticket_status: string;
  ticket_id: number;
  ticket_created_at: string;
  latitude: string;
  longitude: string;
  name: string;
  email: string;
  data_de_inscricao_no_bonde?: string;
  user_id: number;
  condition: string;
  organization_id: number;
  whatsapp: string;
  registration_number: string;
  phone: string;
};

const data: Ticket[] = [];

const tableModel = {
  data,
  setTable: action((state, payload) => ({
    data: payload
  })),
  getTableData: thunk(async (actions: any, payload) => {
    try {
      const res = await request.get(payload);
      actions.setTable(res.data);
    } catch (err) {
      console.log(err);
      actions.setError({
        message: err && err.message
      });
    }
  }),
  error: {},
  setError: action((state, payload) => ({
    error: payload
  }))
};

export default tableModel;