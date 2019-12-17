import React from "react";
import Header from "../components/ui/Header"
import ImageCarousel from "./ui/Carousel";
import MainPageCard from "./ui/MainPageCard";
import Copyright from "./ui/Copyright";
import {Redirect} from "react-router-dom";
import {withTranslation} from "react-i18next";


class MainPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {t} = this.props;
        return (
            <div>
                {localStorage.getItem("login") === 'true' ? '' : <Redirect to={"/smart_road/login"}/>}
                <div className="contentContainer" style={{
                    width: "900px",
                    height: "990px"
                }}>
                    <Header/>
                    <ImageCarousel language={localStorage.getItem('language')}/>
                    <div style={{width: "900px", height: "470px"}}>
                        <h1 style={{textAlign: "center", marginTop: "20px"}}>{t("header")}</h1>
                        <div className="buttonsContainer">
                            <MainPageCard cardTitle={t("ownersTitle")}
                                          cardText={t("ownersDesc")}
                                          cardButton={t("checkOut")}
                                          cardImage="https://www.polandunraveled.com/wp-content/uploads/2018/09/business-.jpg"
                                          pushLink="/smart_road/owner"
                            />
                            <MainPageCard cardTitle={t("driversTitle")}
                                          cardText={t("driversDesc")}
                                          cardButton={t("checkOut")}
                                          cardImage="https://cimg4.ibsrv.net/gimg/www.mbworld.org-vbulletin/960x693/g80m3_leaked_0bb3919b3ee830dc974c13be51232a20c1347833.jpg"
                                          pushLink="/smart_road/driver"
                                          className="mainPageCard"
                            />
                            <MainPageCard cardTitle={t("roadsTitle")}
                                          cardText={t("roadsDesc")}
                                          cardButton={t("checkOut")}
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

export default withTranslation()(MainPage)