import React from "react";
import {DropdownButton, Dropdown} from "react-bootstrap";
import * as ServiceTypesService from "../../services/ServiceTypesService"
import {withTranslation} from "react-i18next";

class ServiceTypesDropDown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceTypes: [],
            selectedType: {
                id: -1,
                title: ""

            }
        }
    };

    componentDidMount() {
        ServiceTypesService.getAll().then(res => this.setState({...this.state, serviceTypes: res}))
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        const {t} = this.props;

        return (
            <DropdownButton id="dropdown-basic-button" title={this.state.selectedType.id === -1 ? t('serviceType') : this.state.selectedType.title}>
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

export default withTranslation()(ServiceTypesDropDown)