import React, { useState,useEffect} from 'react';
import  database from './Firebase';
import SearchIcon from '@material-ui/icons/Search';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import './header.css';

function Header() {
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [input,setInput] = useState('');
    const [searchInput,setSearchInput] = useState('');
    const [details,setDetails] = useState([]);
    const [matchData,setMatchData] = useState([]);

    const unsubscribe = useEffect(() => {
      database.collection('pokemon').onSnapshot(snapshot => (
          setDetails(snapshot.docs.map(doc => ({
              id: doc.id,
              data: doc.data()
          })))
      ));
      return () => {
          unsubscribe();
      } 
    },[]);

    const useStyles = makeStyles((theme) => ({
        paper: {
          position: 'absolute',
          width: 400,
          backgroundColor: theme.palette.background.paper,
          border: '2px solid #000',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
        },
      }));

    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    
    function getModalStyle() {
        const top = 50;
        const left = 50;
      
        return {
          top: `${top}%`,
          left: `${left}%`,
          transform: `translate(-${top}%, -${left}%)`,
        };
      }

    const body = (
        <div style = {modalStyle} className = {classes.paper}>
            <div className = 'matchData'>
                <div className = 'matchData_details'>
                    <h1>Name: {matchData.name}</h1>
                    <h1>Type: {matchData.type}</h1>
                    <h1>Generation: {matchData.generation}</h1>
                    <h1>Hp: {matchData.hp}</h1>
                    <h1>Speed: {matchData.speed}</h1>
                    <h1>Attack: {matchData.attack}</h1>
                    <h1>Defense: {matchData.defense}</h1>
                </div>
                <div className = 'matchData_detail_img'>
                    <img src = {matchData.url} alt = {matchData.name}/>
                </div>
            </div>

        </div>
    );
    const searchPokemon = (e) => {
        e.preventDefault();
        setSearchInput(input)
        
        console.log(input.toString());
        console.log(searchInput.toString());
        details.map(detail => (
            (input === detail.data.name)?(setMatchData(detail.data)):(console.log('no match found'))
        ))
        handleOpen();
    }

    return (
        <div className = 'header'>
                <audio id="myAudio" autoPlay>
                    <source src="https://mobcup.net/d/ujpzjt0u/mp3" type="audio/mpeg"/>
                </audio>
            <div className = 'header_logo'>
                <h1>Poke-Tinder</h1>
            </div>
            <form className = 'header_search'>
                <SearchIcon/>
                <input type = 'text' value = {input} onChange = {event => setInput(event.target.value)} placeholder = 'search your pokemon'/>
                <button type = 'submit' onClick = {searchPokemon} >search</button>
                <Modal
            open={open}
            onClose={handleClose}
            >
            {body}
            </Modal>
            </form>
        </div>
    )
}

export default Header
