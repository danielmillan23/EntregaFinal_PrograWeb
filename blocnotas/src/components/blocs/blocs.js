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
    Content: '',
  });

  const urlDelApi = "http://localhost/dashboard/apiDB.php/records";

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
    axios
      .get(`${urlDelApi}/notes`)
      .then(function (response) {
        setNote(response.data.records);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const AgregarNote = () => {
    axios
      .post(`${urlDelApi}/notes`, {
        UserID: 2,
        Title: addNote.Title,
        Content: addNote.Content,
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