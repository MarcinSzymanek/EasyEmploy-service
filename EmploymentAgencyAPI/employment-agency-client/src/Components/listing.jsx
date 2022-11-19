import './Styles/listing.css'
export default function JobListing({company}){
    // toIsoString has a weird time zone conversion artifact
    // correct date will be +1 day, so this is necessary?
    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
      }

    let date = new Date(company.startdate);
    date = addDays(date, 1);
    let duration = parseInt(company.duration)/30
    return(
        <div className="job-listing">
            <div className="row">
                <div className="column-left">
                    <p>Company: </p>
                    <p>Location: </p>
                    <p>Start Date: </p>
                    <p>Duration: </p>
                    <p>Salary:</p>
                    <p>Description: </p>
                </div>
                <div className="column-right">
                    <p>{company.name} </p>
                    <p>{company.location}</p>
                    <p>{date.toISOString().split('T')[0]}</p>
                    <p>{duration} months</p>
                    <p>{parseInt(company.hourlyWage)}Dkk</p>
                    <p>{company.description}</p>
                </div>
            </div>
        </div>
    )
}