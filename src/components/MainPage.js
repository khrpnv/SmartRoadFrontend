import React from "react";
import Header from "../components/ui/Header"
import ImageCarousel from "./ui/Carousel";
import MainPageCard from "./ui/MainPageCard";
import Copyright from "./ui/Copyright";

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="contentContainer" style={{
                    width: "900px",
                    height: "990px"
                }}>
                    <Header/>
                    <ImageCarousel/>
                    <div style={{width: "900px", height: "470px"}}>
                    <h1 style={{textAlign: "center", marginTop: "20px"}}>We offer</h1>
                        <div className="buttonsContainer">
                            <MainPageCard cardTitle="Service stations owners"
                                          cardText="Owners of service stations can add their facility to our database."
                                          cardButton="Check out"
                                          cardImage="https://www.polandunraveled.com/wp-content/uploads/2018/09/business-.jpg"
                                          pushLink="/smart_road/owner"
                            />
                            <MainPageCard cardTitle="Support service for drivers"
                                          cardText="Drivers can get information about nearest available stations for service"
                                          cardButton="Check out"
                                          cardImage="https://cimg4.ibsrv.net/gimg/www.mbworld.org-vbulletin/960x693/g80m3_leaked_0bb3919b3ee830dc974c13be51232a20c1347833.jpg"
                                          pushLink="/smart_road/driver"
                                          className="mainPageCard"
                            />
                            <MainPageCard cardTitle="Traffic jams and road state"
                                          cardText="Get actual information about traffic jams on roads and statistics."
                                          cardButton="Check out"
                                          cardImage="https://www.fenixbogota.com/wp-content/uploads/2019/05/carrera-30-bogota-with-traffic-jam-960x720.jpg"
                                          pushLink="/smart_road/roads"
                                          className="mainPageCard"
                            />
                        </div>
                    </div>
                    <div style={{width: "900px"}}>
                        <Copyright/>
                    </div>
                </div>
            </div>
        )
    }
}