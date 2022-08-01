import React, {useEffect, useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Axios from "axios";
import Lista from './components/livros/lista';

function App() {
  const [values, setValues] = useState();
  const [listLivros, setListLivros] = useState();
  
  const handleChangeValues = (value) =>{
    setValues(preValue=>({
      ...preValue,
      [value.target.name]: value.target.value,
    }));
  };

  const handleClickButton = () =>{
    Axios.post("http://localhost:3001/cadastrar", {
      nome: values.nome,
      descricao: values.descricao,
      paginas: values.paginas,
    }).then( (response) => {
      
      Axios.get("http://localhost:3001/getLista").then((response) => {
          setListLivros(response.data);
        });
      const form = document.querySelector('form');
      form.reset();
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getLista").then((response) => {
      setListLivros(response.data);
      //console.log(response);
    });
  }, []);

  return (
    <div className="app--container">
      <div className='container-fluid'>
        <div className='register--container '>
          <h1>Lista de Livros</h1>
          <form>
            <div className="form-group margin-15">
              <label htmlfor="nome">Nome do Livro</label>

              <input
                type="text"
                className="form-control"
                id="nome" name="nome" aria-describedby="nome" placeholder="Nome do Livro"
                onChange={handleChangeValues} />
            </div>
            
            <div className="form-group margin-15">
              <label htmlfor="descricao">Descrição do Livro</label>

              <input type="text" 
                className="form-control" 
                id="descricao" name="descricao" aria-describedby="descricao" placeholder="Descricao do Livro" 
                onChange={handleChangeValues} />
            </div>

            <div className="form-group margin-15">
              <label htmlfor="paginas">Quantidade de páginas</label>

              <input type="text"
                className="form-control" 
                id="paginas" name="paginas" aria-describedby="paginas" placeholder="Quantidade de Páginas do Livro"
                onChange={handleChangeValues}  />
            </div>

            <div className="form-group margin-15">
              <button
                className="btn btn-primary register--button"
                onClick={() =>handleClickButton()}>Cadastrar</button>
            </div>
          </form>
        </div>
      </div>
      <div className='container-fluid margin-base'>
        <table className="table table-hover table-dark table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nome</th>
              <th scope="col">Descrição</th>
              <th scope="col">Páginas</th>
            </tr>
          </thead>
          <tbody>
            {typeof listLivros !== "undefined" && listLivros.map((value) =>{
              return (
              <Lista 
                key={value.id}
                livros={listLivros}
                setLivros={setListLivros}
                id={value.id}
                nome={value.nome}
                descricao={value.descricao}
                paginas={value.paginas}>
              </Lista>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
