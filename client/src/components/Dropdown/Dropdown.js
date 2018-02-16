import React from 'react';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

export default class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.select = this.select.bind(this);
        this.toggle = this
            .toggle
            .bind(this);
        this.state = {
            dropdownOpen: false,
            value: "5"
        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
select(event) {
    this.setState({
        dropdownOpen: !this.state.dropdownOpen,
        value: event.target.innerText
    });
}

    render() {
        return (
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret>
                    Radius (Miles)
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick ={this.select}>5</DropdownItem>
                    <DropdownItem onClick = {this.select} >10</DropdownItem>
                    <DropdownItem onClick = {this.select}>15</DropdownItem>
                    <DropdownItem divider/>
                    <DropdownItem onClick = {this.select}>20</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        );
    }
}

