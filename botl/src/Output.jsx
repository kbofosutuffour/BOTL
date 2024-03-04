import './App.css'

export default function Output(props) {

    return (
        <div id="output">
            <h2>You have successfully deleted your account.  Thank you for using BOTL.</h2>
            <button onClick={() => props.setView({input: true})}>Return</button>
        </div>
    )
}