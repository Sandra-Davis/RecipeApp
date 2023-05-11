import {useState} from "react";
import axios from "axios";
import {useGetUserID} from "../hooks/useGetUserID";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";

export const CreateRecipe=()=>{
const userID=useGetUserID();
const navigate=useNavigate();
const [cookies]=useCookies(["access_token"]);

const [recipe,setRecipe]=useState({
    name:"",
    ingrediants:[],
    instructions:"",
    imageURL:"",
    cookingTime:0,
    userOwner:userID
});


    const handleChange=(event)=>{
        const {name,value}=event.target;
        setRecipe({...recipe,[name]:value});
    };

    const handleIngrediantChange=(event,index)=>{
        const {value}=event.target;
        const ingrediants=recipe.ingrediants;
        ingrediants[index]=value;
        setRecipe({...recipe, ingrediants:ingrediants});
    };

    const addIngrediant=()=>{
        setRecipe({...recipe,ingrediants:[...recipe.ingrediants,""]});
    }

    const onSubmit= async (event)=>{
        event.preventDefault();
        try {
            await axios.post("http://localhost:3001/recipes",recipe,{headers:{authorization:cookies.access_token}});
            alert("Recipe created");
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="create">
            <div className="side"></div>
            <div className="vl"></div>
            <div className="create-recipe">
                <h2>Create Recipe</h2>
                <form onSubmit={onSubmit} >
                    <label htmlFor="name">Name :</label>
                    <input className="i" type="text" id="name" name="name" onChange={handleChange}/>
                    <br/><br/><br/>
                    <label htmlFor="ingrediants">Ingrediants :</label>
                    {recipe.ingrediants.map((ingrediant,index)=>{
                        return(<div>
                                <input className="i" key={index} type="text" name="ingrediants" value={ingrediant}  onChange={(event)=>handleIngrediantChange(event,index)}/>
                                <br/><br/><br/>
                        </div>)
                        
                        
                        } )}
                    <button className="bs" type="button"onClick={addIngrediant}>Add Ingrediant</button>
                    <br/><br/><br/>
                    {/* <input type="text" id="ingrediants" /> */}
                    <label htmlFor="instructions">Instructions :</label>
                    <textarea className="t" id="instructions" name="instructions"  onChange={handleChange}/>
                    <br/><br/><br/>
                    <label htmlFor="img">ImageURL :</label>
                    <input className="i" type="text" id="img" name="imageURL"  onChange={handleChange}/>
                    <br /><br/><br/>
                    <label htmlFor="time">Cooking Time(in minutes) :</label>
                    <input className="i" type="number" name="cookingTime" id="time"  onChange={handleChange} />
                    <br/><br/>
                    <button className="bs" type="submit">Create Recipe</button>
                </form>
            </div>
            <div className="vl"></div>
            <div className="side"></div>
    </div>
    );
};