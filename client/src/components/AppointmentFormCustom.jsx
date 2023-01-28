import React from "react";
import { Box } from "@mui/material";
import { AppointmentForm } from "@devexpress/dx-react-scheduler-material-ui";

let labels_fr = {
  allDayLabel: "journée entière",
  repeatLabel: "Répéter",
  titleLabel: "Titre",
  moreInformationLabel: "Plus d'informations",
  detailsLabel: "Ajouter un nouvel évenement",
  commitCommand: "Enregistrer",
  endRepeatLabel: "Fin de la répétition",
  never: "Jamais",
  repeatEveryLabel: "Répéter chaque",
  afterLabel: "Après le",
  onLabel: "à",
  daysLabel: "jour(s)",
  monthsLabel: "mois",
  yearsLabel: "année(s)",
};
export default function AppointmentFormCustom() {
  return (
    <Box>
      <AppointmentForm messages={labels_fr}></AppointmentForm>
    </Box>
  );
}
