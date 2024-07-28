import { formatInTimeZone } from "date-fns-tz";
import { ptBR } from 'date-fns/locale'

const dateFormat = (date) => {
  return formatInTimeZone(date, "America/Sao_Paulo", "dd MMM yyyy", {locale: ptBR});
};

export default dateFormat;
