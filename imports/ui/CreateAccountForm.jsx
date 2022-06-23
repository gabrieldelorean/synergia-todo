import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export const CreateAccountForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [sexo, setSexo] = useState("");
  const [empresa, setEmpresa] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    Meteor.call("account.create", {
      username,
      password,
      email,
      birthdate: new Date(birthdate),
      sexo,
      empresa,
    });

    setUsername("");
    setPassword("");

    navigate(-1);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className="login-form">
      <Typography variant="h1" align="center" fontSize={30} gutterBottom>
        Crie sua conta 😁
      </Typography>

      <Typography variant="h2" align="center" fontSize={20} gutterBottom>
        e nunca mais esqueça o que você tem pra fazer 😉
      </Typography>

      <Box>
        <TextField
          type="text"
          label="username"
          variant="outlined"
          name="username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
      </Box>
      <Box>
        <TextField
          label="email"
          variant="outlined"
          type="email"
          name="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </Box>
      <Box>
        <TextField
          type="password"
          variant="outlined"
          label="password"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </Box>
      <Box>
        <TextField
          sx={{ width: 230 }}
          label="data de nascimento"
          defaultValue={new Date().toISOString().split("T")[0]}
          variant="outlined"
          type="date"
          name="birthdate"
          required
          onChange={(e) => setBirthdate(e.target.value)}
        />
      </Box>
      <Box>
        <FormControl sx={{ width: 230 }}>
          <InputLabel id="sexo-label">Sexo</InputLabel>
          <Select
            defaultValue="N"
            label="sexo"
            variant="outlined"
            name="sexo"
            onChange={(e) => setSexo(e.target.value)}
          >
            <MenuItem value="M">Masculino</MenuItem>
            <MenuItem value="F">Feminino</MenuItem>
            <MenuItem value="X">LGBTQIA+</MenuItem>
            <MenuItem value="N">Não Informar</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box>
        <TextField
          defaultValue="não tenho / participo"
          label="empresa"
          variant="outlined"
          type="text"
          name="empresa"
          onChange={(e) => setEmpresa(e.target.value)}
        />
      </Box>
      <Box
        sx={{ display: "grid", gap: 4, gridTemplateColumns: "repeat(2, 1fr)" }}
      >
        <Button
          sx={{ bgcolor: "red" }}
          color="error"
          variant="contained"
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          Cadastrar
        </Button>
      </Box>
    </Box>
  );
};
