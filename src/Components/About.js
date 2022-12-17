import {React, useContext} from 'react'
import noteContext from '../Context/Notes/NotesContext';

const About = () => {
    const a = useContext(noteContext);
    return (
        <div>
            About has {a.name}
        </div>
    )
}

export default About
