import React from "react";
import {Button, Card} from "react-bootstrap";
import {withRouter} from "react-router-dom";

class MainPageCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card style={{ width: '15rem', float: "left", marginLeft: "20px", height: "400px"}}>
                <Card.Img variant="top" src={this.props.cardImage} style={{width: "100%", height: "45%"}}/>
                <Card.Body>
                    <Card.Title>{this.props.cardTitle}</Card.Title>
                    <Card.Text>
                        {this.props.cardText}
                    </Card.Text>
                    <Button variant="primary" onClick={() => {
                        this.props.history.push(this.props.pushLink)
                    }}>{this.props.cardButton}</Button>
                </Card.Body>
            </Card>
        )
    }
}

export default withRouter(MainPageCard)