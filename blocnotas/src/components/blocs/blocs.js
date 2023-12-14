import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './blocs.module.css';
import Notes from '../notes/notes';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const Blocs = () => {
  const [note, setNote] = useState([]);
  const [addNote, setAddNote] = useState({
    Title: '',
    Descripcion:'',
    Fecha_de_vencimiento:'',
    Prioridad:'',
    Nombre_Usuario:''
  });

  useEffect(() => {
    getNotes();
  }, []);

  const onChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setAddNote({ ...addNote, [name]: value });
    console.log(addNote);
  };


  const getNotes = () => {


  const urlDelApi = "http://localhost:3000/inicio/listas"
    axios
      .get(urlDelApi)
      .then(function (response) {
        setNote(response.data.records);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const AgregarNote = () => {

    const urlDelApi = "http://localhost:3000/inicio/subir"
    axios
      .post(`${urlDelApi}?titulo=${addNote.Title}&Descripcion=${addNote.Descripcion}&Fecha_de_vencimiento=${addNote.Fecha_de_vencimiento}&Prioridad=${addNote.Prioridad}&Nombre_Usuario=${addNote.Nombre_Usuario}`,null, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        }
      })
      .then(function (response) {
        console.log(response);
        getNotes();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className={styles.Blocs} data-testid="Blocs">
      <TextField
        id="outlined-basic"
        name="Title"
        variant="standard"
        onChange={onChange}
      />
      <TextField
        id="outlined-basic"
        name="Content"
        variant="standard"
        onChange={onChange}
      />
      <br></br>
      <Button color="secondary" variant="text" onClick={AgregarNote}>
        Agregar
      </Button>
      <Card>
        <Grid container spacing={2}>
          {note?.map((nota, index) => (
            <Grid item xs={4} key={index}>
              <Notes titulo="titulo" note={nota} refrescar={getNotes} />
            </Grid>
          ))}
        </Grid>
      </Card>
    </div>
  );
};

Blocs.propTypes = {};

Blocs.defaultProps = {};

export default Blocs;