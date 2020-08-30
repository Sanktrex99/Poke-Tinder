import React,{useState,useEffect} from 'react';
import TinderCard from "react-tinder-card";
import "./tinderCard.css";
import database from './Firebase';

function TinderCards() {
    const [people, setPeople] = useState([]);

    useEffect(() => {
        const unsubscribe = database.collection('pokemon').onSnapshot((snapshot) => (
            setPeople(snapshot.docs.map((doc) => doc.data()))
        ));
        return () => {
            unsubscribe();
        }
    },[]);

    return (
        <div className = 'card_body'>
            <div className = 'card_container'>
            {people.map(pokemon => (
                <TinderCard className = 'swipe' key = {pokemon.name} preventSwipe = {['up','down']}>
                    <div className = 'card' style = {{backgroundImage:`url(${pokemon.url})`}}>
                    <div className = 'card_details'>
                        <h3>Name: {pokemon.name}</h3>
                        <h3>Type: {pokemon.type}</h3>
                        <h3>Generation:{pokemon.generation}</h3>
                        <h3>Hp: {pokemon.hp}</h3>
                        <h3>Speed: {pokemon.speed}</h3>
                        <h3>Attack: {pokemon.attack}</h3>
                        <h3>Defense: {pokemon.defense}</h3>
                    </div>
                    </div>
                </TinderCard>
            ))}
            </div>
        </div>
    )
}

export default TinderCards
