import { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import {useCookies} from "react-cookie";

export const Home=()=>{
    const [recipes,setRecipes]=useState([]);
    const [savedRecipes,setSavedRecipes]=useState([]);
    const [cookies]=useCookies(["access_token"]);
    const userID=useGetUserID();

    useEffect(()=>{
        const fetchRecipe= async()=>{
            try {
                const response=await axios.get("http://localhost:3001/recipes");
                setRecipes(response.data);
                // console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        const fetchSavedRecipe= async()=>{
            try {
                const response=await axios.get(`http://localhost:3001/recipes/savedRecipes/ids/${userID}`);
                
                setSavedRecipes(response.data.savedRecipes);

                // console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchRecipe();
        if(cookies.access_token)
        {
            fetchSavedRecipe();
        }
        
    },[]);
    const saveRecipe=async(recipeID)=>{
        console.log(userID);
        console.log(recipeID);
        try {
            const response=await axios.put("http://localhost:3001/recipes",{recipeID,userID},{headers:{authorization:cookies.access_token}});
            console.log(response.data);
            setSavedRecipes(response.data.savedRecipes);
        } catch (error) {
            console.log(error);
        }

    };

    const isRecipeSaved=(id)=>savedRecipes?.includes(id);

    return(
    <div className="home">
        <h1 >Recipes</h1>
        <ul className="grid-container">
            {recipes.map((recipe)=>{
                return(<li className="grid-item" key={recipe._id}>
                    {/* {savedRecipes?.includes(recipe._id)&&<h3>Already Saved</h3>} */}
                    <div>
                        <h2>{recipe.name}</h2>
                        <button 
                            className="bs"
                            onClick={()=>saveRecipe(recipe._id)}  
                            disabled={isRecipeSaved(recipe._id)}
                        >
                        {isRecipeSaved(recipe._id)?"Saved":"Save"}
                        </button>
                    </div>
                    <div>
                        <p>{recipe.instructions}</p>
                    </div>
                    <div>
                        <img className="foood" src={recipe.imageURL} alt={recipe.name}/>
                        <p>Cooking Time:{recipe.cookingTime} (minutes) </p>
                    </div>
                </li>);   
            })}
        </ul>
    </div>);
};