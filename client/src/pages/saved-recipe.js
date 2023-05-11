import React,{ useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";

export const SavedRecipe=()=>{
    const [savedRecipes,setSavedRecipes]=useState([]);
    const userID=useGetUserID();

    useEffect(()=>{

        const fetchSavedRecipe= async()=>{
            try {
                const response=await axios.get(`http://localhost:3001/recipes/savedRecipes/${userID}`);
                
                setSavedRecipes(response.data.savedRecipes);

                console.log(response.data.savedRecipes);
                console.log(savedRecipes);
            } catch (error) {
                console.log(error);
            }
        }

        fetchSavedRecipe();
    },[]);


    return(
    <div className="saved">
        <h1>Saved Recipes</h1>
        <ul className="grid-container">
            {savedRecipes?.map((recipe)=>{
                return(<li className="grid-item" key={recipe._id}>
                    {/* {savedRecipes?.includes(recipe._id)&&<h3>Already Saved</h3>} */}
                    <div>
                        <h2>{recipe.name}</h2>
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