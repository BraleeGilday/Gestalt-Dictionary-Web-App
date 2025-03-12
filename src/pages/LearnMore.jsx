import Navigation from "../components/Navigation";

function LearnMore() {
    return (
        <>
            <header>
                <Navigation/>
            </header>
            <div className="learnMore">
                <h1>Learn More</h1>
                <div className="learnIntents">
                    <h2>Communication Intent</h2>
                    <p>
                        Since gestalts are your child’s way of communicating, they need a variety of 
                        gestalts to communicate in a variety of contexts. You can try to model some of 
                        the following examples to add that variety. The following are categories are from 
                        MeaningfulSpeech’s “Gestalt Check In For Variety” resource. Their website and more 
                        of their resources for GLP learners are linked below. 
                    </p>
                </div>

                <div className="learnCategories">
                    <h3>Eight major categories:</h3>
                    <ol>
                        <li>Commenting: “That’s a big one!”, “It’s stuck”, “Check it out!”</li>
                        <li>Help: “How bout some help”, “Come on help”, “Help me”</li>
                        <li>Transition: “What’s next?”, “Time for bath”,  “Wanna do something different”</li>
                        <li>Protest: “I don’t like it!”, “Stop doing that”, “Don’t touch it”</li>
                        <li>Shared Joy: “I love it!”, “It’s my favorite”, “I’m so happy”</li>
                        <li>Joint Activity: “Let’s go play!”, “We did it!”, “Put it down”</li>
                        <li>Sensory Motor Experience: “We gotta go jump!”, “That’s noisy”, “Swinging is the best”</li>
                        <li>New Situation: “Talk about the new doctor”, “It feels different”</li>
                    </ol>
                </div>

                <div className="learnResources">
                <h2>More GLP Resources</h2>
                    <p>Check out more resources about Gestalt Language Processing below.</p>
                    <ul>
                        <li><a href="https://www.meaningfulspeech.com/" target="_blank">Link to the MeaningfulSpeech Site</a></li>
                        <li><a href="https://www.meaningfulspeechregistry.com/" target="_blank">Link to Registry of GLP Trained Clinicians</a></li>
                    </ul>
                </div>

            </div>
        </>


    )
}

export default LearnMore;