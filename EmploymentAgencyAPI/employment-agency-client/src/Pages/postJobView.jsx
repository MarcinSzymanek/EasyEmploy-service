import "../Components/Styles/postJobView.css"
import { useState } from "react"
import axios from "axios";

export default function PostJobView(){  
    const [inputModel, setInputModel] = useState([]);
    const [date, setDate] = useState([]);
    const [error, setError] = useState("");

    const PostJob = async function(){
        const BaseUrl = "http://localhost:7066/api/Job";
        await axios.post(BaseUrl,{
            companyName : inputModel.companyName,
            location : inputModel.location,
            description : inputModel.description,
            startDate : date,
            durationDays : inputModel.duration * 30,
            hourlySalary : inputModel.wage
        }).then(function(response) {
            console.log(response);
            if(parseInt(response.status)/200 >= 2){
                setError("Something wrong");
                return false;
            }
            setError("Success!");
            console.log("REQUEST APPROVED")
            return true;
        })
        .catch(function(error){
            console.log(error);
            setError("Error submitting request. Make sure no fields are empty");
            return false;
        });
    }

    const handleChange = function(event){
        console.log("handling change");
        setInputModel({...inputModel, [event.target.name]: event.target.value});
    };
    const onSubmission = async function(event){
        event.preventDefault();
        await PostJob();
    };

    return(
        <div className="post-container">
            <p>{error}</p>
            <form className="post-form">
            <label>
                Company Name: &nbsp;
                <input type="text" name="companyName" onChange={handleChange}
                value={inputModel.companyName || ''}></input>
            </label>
            <label>
                Location: &nbsp;
                <input type="text" name="location"
                 onChange={handleChange} value={inputModel.location ||''}
                ></input>
            </label>
            <label>
                Start date: &nbsp;
                <input type="date" value={date || new Date(Date.now)} onChange={(event) => {
                    console.log("date change handler called" + event.target.value);
                    setDate(event.target.value);
                }}></input>
            </label>
            <label>
                Hourly wage in DKK: &nbsp;
                <input type="number" name = "wage" onChange={handleChange}
                value={inputModel.wage}></input>
            </label>
            <label>
                Duration in months: &nbsp;
                <input type="number" name="duration"
                value={inputModel.duration} onChange={handleChange}></input>
            </label>
            <label>
                Description: &nbsp;
                <textarea className="desc-input" name="description"
                type="text" onChange={handleChange}
                 value={inputModel.description ||''}></textarea>
            </label>
            <input type="submit" value="Submit" onClick={onSubmission} style={{height:30, margin:"10px", fontSize:"18px"}}></input>
        </form>
        </div>
    )
}