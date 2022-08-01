import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";
import produce from "immer";

export default function FormDialog(dados) {
  const [editValues, setEditValues] = useState({
    id: dados.id,
    nome: dados.nome,
    descricao: dados.descricao,
    paginas: dados.paginas,
  });

  const handleChangeValues = (values) => {
    setEditValues((prevValues) => ({
      ...prevValues,
      [values.target.id]: values.target.value,
    }));
  };

  const handleClose = () => {
    dados.setOpen(false);
  };

  const handleEditLivro = () => {
    Axios.put("http://localhost:3001/edit", {
      id: editValues.id,
      nome: editValues.nome,
      descricao: editValues.descricao,
      paginas: editValues.paginas,
    });
    /*.then(() => {
      dados.setListLivros(
        dados.listLivros.map((value) => {
          return value.id === editValues.id
            ? {
                id: editValues.id,
                nome: editValues.nome,
                descricao: editValues.descricao,
                paginas: editValues.paginas,
              }
            : value;
        })
      );
    });*/
    handleClose();
  };

  const handleDeleteLivro = () => {
    Axios.delete(`http://localhost:3001/delete/${editValues.id}`).then(() => {
      dados.setListLivros(
        dados.listLivros.filter((value) => {
          return value.id !== editValues.id;
        })
      );
    });
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={dados.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Editar</DialogTitle>
        <DialogContent>
          <TextField
            hidden
            margin="dense"
            id="id"
            label="id"
            defaultValue={dados.id}
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="nome"
            label="Nome do Livro"
            defaultValue={dados.nome}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="descricao"
            label="Descrição"
            defaultValue={dados.descricao}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="paginas"
            label="Número de Páginas"
            defaultValue={dados.paginas}
            type="number"
            onChange={handleChangeValues}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={() => handleDeleteLivro()}>
            Excluir
          </Button>
          <Button color="primary" onClick={() => handleEditLivro()}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}