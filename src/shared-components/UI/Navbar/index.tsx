import React from "react";

import { TextComponent } from "../Text";

import { NavBarContainer } from "./styles";

export const NavBar = () => {
  return (
    <NavBarContainer>
      <TextComponent text="spotleaf 🍀" as="h1" size="xl" color="teal.100" />
    </NavBarContainer>
  );
};
