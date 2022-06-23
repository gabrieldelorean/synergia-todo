import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  IconButton,
  Avatar,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

import { NavigationDrawer } from "./NavigationDrawer";

const Input = styled("input")({ display: "none" });

const convert = (file) => {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => res(reader.result);
    reader.onerror = (error) => rej(error);
  });
};

export const Profile = () => {
  const navigate = useNavigate();
  const user = useTracker(() => Meteor.user());

  const [birthdate, setBirthdate] = useState(new Date(user.profile.birthdate));
  const [sexo, setSexo] = useState(user.profile.sexo);
  const [empresa, setEmpresa] = useState(user.profile.empresa);
  const [profilePhoto, setProfilePhoto] = useState();

  const updateProfile = ({ _id, birthdate, sexo, empresa, avatar }) =>
    Meteor.call("account.update", {
      _id,
      birthdate,
      sexo,
      empresa,
      avatar,
    });

  const submit = async (e) => {
    e.preventDefault();

    if (profilePhoto) {
      const avatar = await convert(profilePhoto[0]);

      updateProfile({
        _id: user._id,
        birthdate: new Date(birthdate),
        sexo,
        empresa,
        avatar,
      });

      navigate(-1);
    } else {
      updateProfile({
        _id: user._id,
        birthdate: new Date(birthdate),
        sexo,
        empresa,
      });

      navigate(-1);
    }
  };

  return (
    <Box component="form" className="login-form" onSubmit={submit}>
      <Box className="user">
        <NavigationDrawer />
      </Box>
      <Box>
        <Avatar
          alt="your profile photo"
          src={!!user.profile.avatar ? user.profile.avatar : ""}
        >
          {user.username[0].toUpperCase()}
        </Avatar>
      </Box>
      <Box>
        <label htmlFor="icon-button-file">
          <Input
            accept="image/*"
            id="icon-button-file"
            type="file"
            onChange={(e) => {
              setProfilePhoto(e.target.files);
            }}
          />
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <PhotoCamera />
          </IconButton>
        </label>
      </Box>
      <Box>
        <TextField
          disabled
          defaultValue={user.username}
          label="username"
          variant="outlined"
          type="text"
          name="username"
        />
      </Box>
      <Box>
        <TextField
          disabled
          defaultValue={user.emails[0].address}
          label="email"
          variant="outlined"
          type="email"
          name="email"
        />
      </Box>
      <Box>
        <TextField
          sx={{ width: 230 }}
          defaultValue={user.profile.birthdate.toISOString().split("T")[0]}
          label="data de nascimento"
          variant="outlined"
          type="date"
          name="birthdate"
          onChange={(e) => setBirthdate(e.target.value)}
        />
      </Box>
      <Box>
        <FormControl sx={{ width: 230 }}>
          <InputLabel id="sexo-label">Sexo</InputLabel>
          <Select
            defaultValue={user.profile.sexo}
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
          defaultValue={user.profile.empresa}
          label="empresa"
          variant="outlined"
          type="text"
          name="empresa"
          onChange={(e) => setEmpresa(e.target.value)}
        />
      </Box>
      <Box
        sx={{
          display: "grid",
          gap: 4,
          gridTemplateColumns: "repeat(2, 1fr)",
        }}
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
          Save
        </Button>
      </Box>
    </Box>
  );
};
