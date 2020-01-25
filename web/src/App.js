import React, { useState, useEffect } from 'react';

import "./styles/Global.css";
import "./styles/App.css";
import "./styles/Sidebar.css";
import "./styles/Main.css";
import api from "./services/api";

import DevItem from "./components/DevItem";
import DevForm from "./components/DevForm";

//componente: bloco isolado de html, css e js, que nao interfere no restante do app.
//propriedade: "atributo" de uma tag html, mas no react. tipo "<Header title="Dashboard">. sao infos que um componente
//pai passa para um componente filho.
//estado: informações mantidas pelo componente (lembrar da imutabilidade!)

function App() {

  const [devs, setDevs] = useState([]);
  
  useEffect(()=>{
    async function loadDevs(){
      const response = await api.get("/devs");
      setDevs(response.data);
    }
    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post("/devs", data);
    setDevs([...devs, response.data]);
  }
 
  return (
  <div id="app">
    <aside>
      <strong>Cadastrar</strong>
      <DevForm onSubmit={handleAddDev}/>
    </aside>
    <main>
      <ul>
      {devs.map(dev => (
        <DevItem key={dev._id} dev={dev} />
      ))}       
      </ul>
    </main>
  </div>
  );
}

export default App;
