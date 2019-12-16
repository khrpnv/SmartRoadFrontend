import React from "react";
import Header from "../components/ui/Header"
import ImageCarousel from "./ui/Carousel";
import MainPageCard from "./ui/MainPageCard";
import Copyright from "./ui/Copyright";
import {Redirect} from "react-router-dom";
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    en: {
        header: "We offer",
        ownersTitle: "Service stations owners",
        ownersDesc: "Owners of service stations can add their facility to our database.",
        driversTitle: "Support service for drivers",
        driversDesc: "Drivers can get information about nearest available stations for service.",
        roadsTitle: "Traffic jams and road state",
        roadsDesc: "Get actual information about traffic jams on roads and statistics.",
        checkOut: "Check out"
    },
    ua: {
        header: "Ми пропонуємо",
        ownersTitle: "Власникам станцій обслуговування",
        ownersDesc: "Власники станцій обслуговування можуть додати їх установу.",
        driversTitle: "Система підтримки водіїв",
        driversDesc: "Водії можуть отримати інформацію про найближчі вільні точки.",
        roadsTitle: "Затори та поточний стан доріг",
        roadsDesc: "Отримуйте актуальну інформацію про завантаженність доріг.",
        checkOut: "Детальніше"
    }
});

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.switchLanguage = this.switchLanguage.bind(this);
    }

    switchLanguage() {
        let currentLanguage = localStorage.getItem("language");
        if (currentLanguage === 'en') {
            strings.setLanguage('ua');
        } else {
            strings.setLanguage('en');
        }
        localStorage.setItem("language", strings.getLanguage());
        this.setState({...this.state});
    }

    render() {
        strings.setLanguage(localStorage.getItem("language"));
        return (
            <div>
                {localStorage.getItem("login") === 'true' ? '' : <Redirect to={"/smart_road/login"}/>}
                <div className="contentContainer" style={{
                    width: "900px",
                    height: "990px"
                }}>
                    <Header switchLanguage={this.switchLanguage} />
                    <ImageCarousel language={localStorage.getItem('language')} />
                    <div style={{width: "900px", height: "470px"}}>
                    <h1 style={{textAlign: "center", marginTop: "20px"}}>{strings.header}</h1>
                        <div className="buttonsContainer">
                            <MainPageCard cardTitle={strings.ownersTitle}
                                          cardText={strings.ownersDesc}
                                          cardButton={strings.checkOut}
                                          cardImage="https://www.polandunraveled.com/wp-content/uploads/2018/09/business-.jpg"
                                          pushLink="/smart_road/owner"
                            />
                            <MainPageCard cardTitle={strings.driversTitle}
                                          cardText={strings.driversDesc}
                                          cardButton={strings.checkOut}
                                          cardImage="https://cimg4.ibsrv.net/gimg/www.mbworld.org-vbulletin/960x693/g80m3_leaked_0bb3919b3ee830dc974c13be51232a20c1347833.jpg"
                                          pushLink="/smart_road/driver"
                                          className="mainPageCard"
                            />
                            <MainPageCard cardTitle={strings.roadsTitle}
                                          cardText={strings.roadsDesc}
                                          cardButton={strings.checkOut}
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