import '../Styles/bigButton.css'
export default function BigButton({onClick, text}){
    return(
        <button className="big-button" onClick={onClick}>{text}</button>
    )
}