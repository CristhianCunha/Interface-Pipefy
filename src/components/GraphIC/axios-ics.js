import axios from "axios";

/* Componente axios-projects é criado para definir uma instância
do axios para o uso geral, definindo a baseURL para o resto da
aplicação, que neste caso é a URL para o acesso a API da UFPB */

const instance = axios.create({
  baseURL: "https://api.ufpb.br/api/"
});

export default instance;
