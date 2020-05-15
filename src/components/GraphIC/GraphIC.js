import React, { Component } from "react";
import Spinner from "./Spinner";
import Chart from "react-google-charts";
import classes from "./GraphIC.module.css";
import axios from "./axios-ics.js";

/* Container Graph IC faz diversas requisições GET para receber
todos os projetos da API UFPB, filtrando os projetos indesejados.
Ele constrói um array contendo as informações do número de
projetos por ODS e as cores de cada ODS, para que possa fazer a
chamada do componente Chart passando esses dados, o que faz com
que o gráfico de barras seja gerado */

class GraphIC extends Component {
  state = {
    projectsNum: [
      [
        [
          "Objetivos de Desenvolvimento Sustentável (ODS)",
          "Projetos",
          { role: "style" },
          { role: "annotation" }
        ]
      ]
    ],
    colors: [
      "dodgerblue",
      "#e5233d",
      "#dda73a",
      "#4ca146",
      "#c7212f",
      "#ef402d",
      "#27bfe6",
      "#fbc412",
      "#a21b43",
      "#f26a2e",
      "#de1768",
      "#f89d2a",
      "#bf8d2c",
      "#407f46",
      "#1f97d4",
      "#59ba47",
      "#136a9f",
      "#14496b"
    ],
    odsLoaded: 1,
    highest: 0,
    loading: true,
    data:"",
  };

  componentDidMount() {
      this.consumirAPI();
  }
  
  filtrarOds(data){
    for(let odsAtual = 1; odsAtual<=17; odsAtual++){
      const fetchedProjects = [...this.state.projectsNum];
      let dataAtual = data.filter(
        prj =>
          prj.objetivoOds === odsAtual //pega todos os projetos com essa ods
      );

      let counter = 0;
      counter = Number(dataAtual.length);   
      if (counter > this.state.highest) {
        this.setState({ highest: counter });     
      }

      fetchedProjects[0][odsAtual] = [
        "ODS " + odsAtual,
        counter,
        this.state.colors[odsAtual],
        counter
      ];
      this.setState({
        projectsNum: fetchedProjects
      });

      if (odsAtual === 17) {
        let totalProjetosIC = 0
        for(let ii = 1; ii < 18; ii++){
          totalProjetosIC += this.state.projectsNum[0][ii][1]
        }
        for(let ii = 1; ii < 18; ii++){
          this.state.projectsNum[0][ii][3] = Math.round((this.state.projectsNum[0][ii][1]*100) / totalProjetosIC)+ '%'
        } 
        this.state.projectsNum[0][1][0] = "Erradicação da pobreza";
        this.state.projectsNum[0][2][0] = "Fome zero e agricultura sustentável";
        this.state.projectsNum[0][3][0] = "Saúde e bem-estar";
        this.state.projectsNum[0][4][0] = "Educação de qualidade";
        this.state.projectsNum[0][5][0] = "Igualdade de gênero";
        this.state.projectsNum[0][6][0] = "Água potável e saneamento";
        this.state.projectsNum[0][7][0] = "Energia acessível e limpa";
        this.state.projectsNum[0][8][0] = "Trabalho decente e crescimento econômico";
        this.state.projectsNum[0][9][0] = "Indústria, inovação e infraestrutura";
        this.state.projectsNum[0][10][0] = "Redução das desigualdades";
        this.state.projectsNum[0][11][0] = "Cidades e comunidades sustentáveis";
        this.state.projectsNum[0][12][0] = "Consumo e produção responsáveis";
        this.state.projectsNum[0][13][0] = "Ação contra a mudança global do clima";
        this.state.projectsNum[0][14][0] = "Vida na água";
        this.state.projectsNum[0][15][0] = "Vida Terrestre";
        this.state.projectsNum[0][16][0] = "Paz, justiça e instituições eficazes";
        this.state.projectsNum[0][17][0] = "Parcerias e meios de implementação";
        
        console.log(totalProjetosIC)
        console.log(this.state);
        this.setState({
          loading: false
        });
        var carregando = false;
      }
    }
    
  }

  consumirAPI = () => {
    console.log("asdasdasdasdA: ")
    axios.get("https://api.ufpb.br/api/pesquisa/iniciacao-cientifica")
      .then(res => {
        let data = res.data;
        console.log("GRAFICO IC, API CONSUMIDA: ")
        this.filtrarOds(data)
      })
      .catch(err => {
        console.log("erro ao consumir api Cris")
        this.setState({
          loading: false
        });
        
      });
      
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.loading !== this.state.loading;
  }

  render() {
    let chart = null;

    if (!this.state.loading) {
      if (this.state.projectsNum[0].length === 18) {
        chart = (
          <Chart
            width={"100%"}
            height={"550px"}
            chartType="BarChart"
            loader={<Spinner />}
            data={this.state.projectsNum[0]}
            options={{
              chartArea: { width: "50%", height: "90%" },
              hAxis: {
                title: "Número de Projetos de Iniciação Científica",
                viewWindow: { min: 0, max: this.state.highest }
              },
              vAxis: {
                title: "Objetivo de Desenvolvimento Sustentável (ODS)"
              },
              legend: { position: "none" },
              animation: {
                startup: true,
                easing: "linear",
                duration: 800
              }
            }}
            legendToggle
          />
        );
      } else {
        chart = (
          <div className={classes.Graph}>
            <p style={{ textAlign: "center", fontWeight: "bold" }}>
              Aconteceu algum problema no carregamento do gráfico, tente
              novamente mais tarde!
            </p>
          </div>
        );
      }
    } else {
      chart = <Spinner />;
    }

    return chart;
  }
}

export default GraphIC;
