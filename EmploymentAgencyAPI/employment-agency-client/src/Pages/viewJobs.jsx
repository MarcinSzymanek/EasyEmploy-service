import React, {useEffect, useState} from 'react';
import axios from 'axios';
import JobListing from '../Components/listing';
import '../Components/Styles/viewJobs.css';

export default function ViewJobs(){
    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        const FetchJobs = async function (){
            const BaseUrl = "http://localhost:7066/api/Job";
            const response = await axios.get(BaseUrl);
            const data = response.data;
            console.log(data);
            let allJobs = [];
            var entries = 0;
            data.forEach(element => {
                entries++;
                allJobs.push(element);
                console.log("Number of entries = " + entries);
            });
            setJobs(allJobs);
        }
        FetchJobs();
    }, [])

    var cards = [];
    const createEntries = function() {
        for(var i = 0; i < jobs.length; i++){
            console.log("company name = " + jobs[i].companyName)
            var temp = (
                <JobListing
                company = {{
                    name : jobs[i].companyName,
                    location : jobs[i].location,
                    description : jobs[i].description,
                    startdate : jobs[i].startDate,
                    duration : jobs[i].durationDays,
                    hourlyWage : jobs[i].hourlySalary
                    }}
                />
            )
            cards.push(temp);
        }
    }
    createEntries();
    return(
        <div className='entries'>
            {cards}
        </div>
    )
}