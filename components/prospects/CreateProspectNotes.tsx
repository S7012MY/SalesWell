import { Box, Button, TextareaAutosize} from "@mui/material";
import React, { useState } from "react";


function Modal({ prospectId, setCloseModal }){
    const [note, setNote] = useState("");
    
    const addNote= (e)=> {
        fetch('/api/prospect/create-note', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ prospectId, note })
          })
            .catch(error => {
              console.error('A aparut o eroare:', error)
            })
        console.log('acesta este textul:', note, prospectId);
        setNote("");
    }
    return <Box className="modalBackground">
        <Box className="modalContainer">
            <TextareaAutosize
                minRows={5}
                style={{ width:'693px' }}
                value={note}
                onChange={(e)=> setNote(e.target.value)}/>
            <br/>
            <Button onClick={addNote} variant="outlined" style={{ marginRight: '0.5rem' }}>submit</Button>
            <Button onClick={()=> {setCloseModal(false)}} variant="outlined">cancel</Button>
        </Box>
    </Box>
}
export default Modal;