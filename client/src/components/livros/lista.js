import React from "react";
import FormDialog from "../dialog/dialog";

export default function Lista(data) {
  const [open, setOpen] = React.useState(false);

  const handleClickItem = () => {
    setOpen(true);
  };

  return (
    <>
    <FormDialog
    open = {open} 
    setOpen = {setOpen} 
    id = {data.id}
    nome = {data.nome} 
    descricao = {data.descricao}
    paginas = {data.paginas}
    listLivros = {data.listLivros}
    setListLivros = {data.setListLivros}
    />
    <tr onClick={() => handleClickItem()}>
      <th scope="row">{data.id}</th>
      <td>{data.nome}</td>
      <td>{data.descricao}</td>
      <td>{data.paginas}</td>
    </tr>
    </>
  );
}