import axios from 'axios'
import React, { useContext,useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {InputContext} from "../context/inputContext"
export default function Navbar() {
const {setPhotos}= useContext(InputContext)
const [category,setCategory] =useState("")
const [input, setInput] = useState("")
const [search, setSearch] = useState("");
const navigate = useNavigate();
const categorySearch =(event)=>{
setCategory(event.target.innerText)

}
useEffect(()=>{
    if(category){
        searchImages();
        
    }
    if(search){
        searchImages(); 
             
    }
    async function searchImages() {
        const apiKey = 'cc45789d14c6e1240b178e7d8650faf2';
        let url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&format=json&nojsoncallback=1&text=${input}`;
       
        if (category) {
          url += `&tags=${category}`;
        }        
       await axios.get(url)      
          .then(data => {                
            setPhotos(data.data.photos.photo);
          })
          .catch(error => {
            console.error(error);
          })
    }
},[category,search])

const handleSearch=()=>{    
    setSearch(input)
}
   
    return (
        <div>
            <div>
                <h1>SnapShot</h1>
                <input type="text" onChange={(e)=>{setInput(e.target.value)}} />
                <button onClick={()=>handleSearch()}><i className="fa-solid fa-magnifying-glass"></i></button>
            </div>
            <div id='category'>
                <span onClick={categorySearch}>Mountain</span>
                <span onClick={categorySearch}>Beaches</span>
                <span onClick={categorySearch}>Birds</span>
                <span onClick={categorySearch}>Food</span>
            </div>
            <h3 style={{color: "rgb(4, 4, 95)"}}>{category}</h3>
        </div>
    )
}
