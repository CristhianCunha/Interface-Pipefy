import React from "react";
import classes from "./Spinner.module.css";

/* Componente Spinner apenas apresenta um div que possui
um stylesheet diferencial que faz gerar uma animação
de carregamento, é um componente que deve sempre ser utilizado 
quando houver um tempo de espera para o usuário. Outros stylesheets
podem ser encontrados na internet, apenas procurando por loading css
no google */

const spinner = () => <div className={classes.loader}>Loading...</div>;

export default spinner;
