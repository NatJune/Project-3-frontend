import { useState, useEffect } from "react";
import { auth } from './services/firebase';
import Header from './components/Header/Header';
import "./App.css";
import { 
  fetchExperts, 
  updateExpert, 
  createExpert, 
  deleteExpert } from "./services/expert-service";

export default function App() {
  const [state, setState] = useState({
    experts: [],
    newExpert: {
      expert: "",
      level: "3"
    },
    editMode: false
  });

  const [ userState, setUserState ] = useState({
    user: null
  });

  useEffect(function() {
    async function getAppData() {

      if(!userState.user) return;

      const experts = await fetchExperts(userState.user.uid);
      
      setState(prevState => ({
        ...prevState,
        experts
      }));
    }
    getAppData();
    // Set up authentication observer
    const unsubscribe = auth.onAuthStateChanged(user => setUserState({ user }));

    // clean up function
    return function() {
      // clean up subscriptions
      unsubscribe();
    }
  }, [userState.user]);

  async function handleSubmit(e) {
    if(!userState.user) return;

    e.preventDefault();

    if(state.editMode) {
      try {
        const experts = await updateExpert(state.newExpert, userState.user.uid);
        setState({
          experts,
          editMode: false,
          newExpert: {
            expert: '', 
            level: '3'
          }
        });
        
      } catch (error) {
        
      }

    } else {
      // Create a new skill
      try {
        const expert = await createExpert(state.newExpert, userState.user.uid);
    
        setState({
          experts: [...state.expert, expert],
          newExpert: {
            expert: "",
            level: "3"
          }
        });
        
      } catch (error) {
        // do something else so my users don't freak out 😄
        console.log(error);
      }
    }
  }

  function handleChange(e) {
    setState(prevState => ({
        ...prevState,
        newExpert: {
          ...prevState.newExpert,
          [e.target.name]: e.target.value
        }
    }));
  }


  function handleEdit(id) {
    if(!userState.user) return;
    const expertToEdit = state.experts.find(expert => expert._id === id);
    setState(prevState => ({
      ...prevState,
      newExpert: expertToEdit,
      editMode: true
    }));
  }

  async function handleDelete(id) {
    if(!userState.user) return;
    try {
      const experts = await deleteExpert(id, userState.user.uid);
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
    <Header user={userState.user} />
    <section>
      {userState.user ? state.experts.map((s, i) => (
        <article key={i}>
          <div>{s.expert}</div> 
          <div>{s.level}</div>
          <div 
            className="controls"
            onClick={() => handleEdit(s._id)}
          >{'✏️'}</div>
          <div 
            className="controls"
            onClick={() => handleDelete(s._id)}
          >{'🗑'}</div>
        </article>
      )) :
        <article style={{padding: 15}}>No Experts to Show - Login to Get Started</article>
      }
      <hr />
      <form onSubmit={handleSubmit}>
        <label>
          <span>EXPERT</span>
          <input name="expert" value={state.newExpert.expert} onChange={handleChange}/>
        </label>
        <label>
          <span>LEVEL</span>
          <select name="level" value={state.newExpert.level} onChange={handleChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <button disabled={!userState.user}>{state.editMode ? 'EDIT COMMENt' : 'ADD COMMENT'}</button>
      </form>
    </section>
    </>
  );
}