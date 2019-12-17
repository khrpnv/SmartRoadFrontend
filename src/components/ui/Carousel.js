import React from "react";
import {Carousel} from "react-bootstrap";
import {withTranslation} from "react-i18next";

class ImageCarousel extends React.Component {

    render() {
        const {t} = this.props;
        return (
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100 carousel-image"
                        src="https://www.incimages.com/uploaded_files/image/970x450/getty_523821065_98040.jpg"
                        alt="Traffic jam"
                    />
                    <Carousel.Caption>
                        <h1>{t("jam")}</h1>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 carousel-image"
                        src="https://cdn.autocentre.ua/wp-content/uploads/2017/06/5-50.jpg"
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h1>{t("serviceStation")}</h1>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 carousel-image"
                        src="https://images.squarespace-cdn.com/content/v1/57bf69aa9f7456b465a1ef78/1552972248385-JLADWPA6BC7YCPRKRFM4/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iyqMbMesKd95J-X4EagrgU9L3Sa3U8cogeb0tjXbfawd0urKshkc5MgdBeJmALQKw/service-page-mobile-car-wash-2500x1667.jpg?format=2500w"
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h1>{t("carWash")}</h1>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        )
    }
}

export default withTranslation()(ImageCarousel)