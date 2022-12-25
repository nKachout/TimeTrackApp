import React from 'react';
import { Box } from "@mui/material";
import { AppointmentForm } from "@devexpress/dx-react-scheduler-material-ui";
import { EditingState } from '@devexpress/dx-react-scheduler';


let labels_fr = {
    allDayLabel: 'journée entière',
    repeatLabel: 'Répéter',
    titleLabel: 'Titre',
    moreInformationLabel: 'Plus d\'informations',
    detailsLabel: 'Ajouter un nouvel évenement',
    commitCommand: 'Enregistrer',
    endRepeatLabel: 'Fin de la répétition',
    never: 'Jamais',
    repeatEveryLabel: 'Répéter chaque',
    afterLabel: 'Après le',
    onLabel: 'à',
    daysLabel: 'jour(s)',
    monthsLabel: 'mois',
    yearsLabel: 'année(s)',
}
let comProps ={
    /** Specifies whether the command layout is full-size. */
    fullSize: true,
    /** An event raised when the Commit button is clicked. The event handler should commit an appointment changes. */
    onCommitButtonClick: onHandleCommitButtonClick,
    /** An event raised when the Cancel button is clicked. The event handler should close the appointment form. */
    onCancelButtonClick: () => {},
    /** An event raised when the Delete button is clicked. The event handler should delete an appointment. */
    onDeleteButtonClick: () => {},
};
let onHandleCommitButtonClick = () => {console.log('onHandleCommitButtonClick')};
export default function AppointmentFormCustom() {

    return (
        <Box>
            <AppointmentForm messages={labels_fr} >
                <AppointmentForm.CommandLayout {...comProps} />
                <EditingState />
            </AppointmentForm>
        </Box>
      );
}