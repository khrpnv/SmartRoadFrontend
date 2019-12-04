import React from "react";
import {DropdownButton, Dropdown} from "react-bootstrap";
import * as ServiceTypesService from "../../services/ServiceTypesService"

export default class ServiceTypesDropDown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceTypes: [],
            selectedType: {
                id: -1,
                title: 'Service Type'
            }
        }
    }

    componentDidMount() {
        ServiceTypesService.getAll().then(res => this.setState({...this.state, serviceTypes: res}))
    }

    render() {
        return (
            <DropdownButton id="dropdown-basic-button" title={this.state.selectedType.title}>
                {this.state.serviceTypes.map(type => (
                    <Dropdown.Item key={type.id} onClick={(event) => {
                        this.setState({
                            ...this.state, selectedType: {
                                id: type.id,
                                title: type.typeName
                            }
                        });
                        this.props.setTypeId(type.id)
                    }}>{type.typeName}</Dropdown.Item>
                ))}
            </DropdownButton>
        )
    }
}