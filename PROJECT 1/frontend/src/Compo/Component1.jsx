import Image from "../assets/mk.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
// import { Link } from "react-router-dom";

function Component1(){
    return(
        <>
            <div className="get-started-body">
                <div className="get-started">
                    <h1>
                        Let's get started
                    </h1>
                    <p>
                        Welcome to our AI-powered Plant Disease Identification System! Protect your crops by quickly identifying plant diseases with just a photo of a leaf. Our platform provides instant diagnoses and treatment recommendations to help farmers and agricultural experts take timely action, preventing crop losses and boosting productivity. Get started today and ensure healthier, more resilient crops!
                    </p>
                    <a href="scan/index.html"><button className="gsi-btn" >Scan <FontAwesomeIcon className="" icon={faCamera} /> </button></a>
                    {/* <img src={Image} ></img> */}
                </div>
            </div>
        </>
    );
}
export default Component1