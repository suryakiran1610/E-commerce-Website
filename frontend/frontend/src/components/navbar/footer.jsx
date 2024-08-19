import React from "react";
import './footer.css'

function Footer(){

    return(

        <>
            <footer>
                <div className="footpanel1">
                    Back to top
                </div>
                <div className="footpanel3">
                    <div className="nonstop">
                        <div className="footpanelbox1 radius">
                            <div className="amlogo">
                            </div>
                        </div>   
                        <div className="footpanelbox2 radius">
                            <i className="fa-solid fa-globe"></i>
                            English
                        </div>
                        <div className="footpanelbox3 radius">
                            $ USD-U.S.Dollar
                        </div>
                        <div className="footpanelbox4 radius">
                            <div className="uslogo"></div>
                            United States
                        </div>
                    </div>
                </div> 
                <div className="footpanel4">
                    <div className="pages">
                        <a> Conditions of Use</a>
                        <a >Privacy Notice</a>
                        <a >Your Ads Privacy Choices</a>
                    </div>
                    <div className="copyright">
                    © 1996-2023, Amazon.com, Inc. or its affiliates
                    </div>
                </div>    
            </footer>
        </>
    )
}
export default Footer