import React from "react";
import Notes from "./Notes";
import LoginPage from "./LoginPage"
// import usecontext from "../Context/Notes/NotesContext";

const Home = () => {
  // const  context = useContext(usecontext);

  return (
    <div>
     

     {!localStorage.getItem('token') ? <LoginPage />:<Notes />

     }
      
      
      </div>
    
  );
};

export default Home;
