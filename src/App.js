import { useState, useEffect } from "react";
import { auth } from './services/firebase';
// import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
// import Expert from './components/Expert/Expert';
// import Comment from './components/Comment/Comment';
import image from './background.jpg'
import "./App.css";
import { 
  fetchExperts, 
  updateExpert, 
  createExpert, 
  deleteExpert } from "./services/expert-service";

export default function App() {
  const [state, setState] = useState({
    experts: [{expert:"Business", names:"Smith", email:"gogo@yahoo.com", phone:"555-555-5555"}],
    newExpert: {
      expert: "",
      names: "",
      email:"",
      phone:"",
    },
    editMode: false
  });

  const [ userState, setUserState ] = useState({
    user: null
  });

  useEffect(function() {
    async function getData() {
      if(!userState.user) return;
        const experts = await fetchExperts(userState.user)
          // const experts = experts.filter(expert => expert.uid === userState.user)
        setState(prevState => ({
            ...prevState,
            experts
        }));
    }
     

    getData();
    const unsubscribe = auth.onAuthStateChanged(user => setUserState({ user }));
    return function() {
      unsubscribe();
    }
  },[userState.user]);
  

  async function handleSubmit(e) {
   
    if(!userState.user) return;
      e.preventDefault();
    if(state.editMode) {
      try {
        const experts = await updateExpert(state.newExpert, userState.user);
        setState({
          experts,
          editMode: false,
          newExpert: {
            expert:"",
            name: "",
            email:"",
            phone:"",
          }
        });
        
      } catch (error) {
       
      }

    } else {
      // Create a new skill
      try {
        const expert = await createExpert(state.newExpert, userState.user);
    
        setState( prevState => ( {
          experts: [...prevState.experts, expert],
          newExpert: {
            expert: "",
            names: "",
            email:"",
            phone:"",
          },
          editMode:prevState.editMode
        }));
        
      } catch (error) {
        console.log(error);
      }
    }
  }

  function handleChange(e) {
    setState(prevState => ({
        ...prevState,
        newExpert: {
          ...prevState.newExpert,
          [e.target.name]: e.target.value,
          // uid: userState.user.uid
        }
    }));
    // console.log(state.newExpert)
  };


  function handleEdit(id) {
    if(!userState.user) return;
    const expertToEdit = state.experts.find(expert => expert._id === id);
    setState(prevState => ({
      ...prevState,
      newExpert: expertToEdit,
      editMode: true
    }));
  };

  async function handleDelete(id) {
    if(!userState.user) return;
    try {
      const experts = await deleteExpert(id, userState.user);
      setState(prevState => ({
        ...prevState,
        experts
      }));
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
    <Navbar/>
    <img style={{height: 300}} src={image} alt=""/>
      {userState.user ? state.experts.map((e, i) => (
        <article key={i}>
          <div>{e.expert}</div>
          <div>{e.names}</div> 
          <div>{e.email}</div>
          <div>{e.phone}</div>
          <div 
            className="controls"
            onClick={() => handleEdit(e._id)}
          >{'✏️'}</div>
          <div 
            className="controls"
            onClick={() => handleDelete(e._id)}
          >{'🗑'}</div>
        </article>
      )) :
        <article style={{padding: 15}}>Must login to get Started</article>
      }
      <hr />
    
      <form onSubmit={handleSubmit}>
        <label>
          <span>expert:</span>
          <input name="expert" value={state.newExpert.expert} onChange={handleChange}/>
          <span>name:</span>
          <input names="text" id="names" name="names"value={state.newExpert.names} onChange={handleChange}/>
          <span>phone:</span>
          <input phone="text" id="phone" name="phone"value={state.newExpert.phone} onChange={handleChange}/>
          <span>email:</span>
          <input email="text" id="email" name="email"value={state.newExpert.email} onChange={handleChange}/>
  
        </label>
        <input type="submit"/>
        <label>
        <Footer user={userState.user}/>
          <br></br>
        </label>
      </form>
    </>
    );
  }
