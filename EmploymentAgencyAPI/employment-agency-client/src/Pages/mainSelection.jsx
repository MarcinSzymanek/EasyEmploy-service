import BigButton from "../Components/Basic/BigButton"; 
import '../Components/Styles/mainSelection.css';
import {useNavigate } from "react-router-dom";

export default function MainSelection(){
    const navigate = useNavigate();
    const OnPostClicked = function(){
        console.log("Post clicked");
        navigate("/postJob");
    }

    const OnShowClicked = function(){
        navigate("/viewJobs")
    }
     
    return(
        <div className="container">
            <BigButton text = "Post your job" onClick={OnPostClicked}/>
            <BigButton text = "Show job listings" onClick={OnShowClicked}/>
        </div>
    )
}