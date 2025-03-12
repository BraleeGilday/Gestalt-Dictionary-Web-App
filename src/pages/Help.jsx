import BackToDictionaryButton from "../components/BackToDictionaryButton";
import flipCard from "../assets/flipCard.png"
import addNewScript from "../assets/addNewScript.png"
import Navigation from "../components/Navigation";

function Help() {
    return (
        <>
            <header>
                <Navigation/>
            </header>

            <div className="helpPage">
            <h1>Help</h1>
            <h2>
                The Gestalt Dictionary is designed to be a support tool for your 
                child with Gestalt Language Processing. Use the following guide to 
                help you navigate our tools. 
            </h2>

            <div className="helpSection">
                <img src={addNewScript} alt="Zoomed in image of the arrow that flips the card" className="helpImage"></img>
                <p className="textRight">
                    When you click the Add New Script button, a new page will pop up to add 
                    information about your child’s particular script. Click Save. 
                </p>
            </div>

            <div className="helpSection">
                <img src={flipCard} alt="Zoomed in image of Add New Script button" className="helpImage"></img>
                <p className="textRight">
                    Once you’ve saved your script, you will see it appear as a card in 
                    your Gestalt Dictionary. Click the purple arrow to flip the card and
                    see more details about this script. Click the pencil to edit this 
                    script or add new information. 
                </p>
            </div>
            <BackToDictionaryButton />

        </div>


        </>



    )
}

export default Help;