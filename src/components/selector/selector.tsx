import React from "react";
import "./selector.css"

let clickOutside = require('click-outside');

interface ISelectorItem {
    id: number,
    value: string
}

interface ISelectorProps {
    items: ISelectorItem[],
    placeholder: string,
    default: string,
    isOpen: false
} 

class Selector extends React.Component<any, any> {
    constructor(props: ISelectorProps) {
        super(props);
        this.state  = {
            error: null
        }
    }

    render() {
        return (
            <div tabIndex={0} onBlur={() => {this.props.closeSelector()}} onClick={() => this.props.changeOpenSelector()} className="selector-wrapper">
                <div className="selector">
                    <div className={this.props.isOpen ? "selector-inner selector-inner_transform" : "selector-inner"}>
                        {this.props.placeholder}
                    </div>
                </div>
                {this.props.isOpen ? 
                     <div className="selector-list-wrapper">
                         {this.props.items && this.props.items.length ?
                            <div className="selector-list">
                                <div className="selector-list__item" onClick={() => this.props.setFilter(undefined, '')} >{this.props.default}</div>
                                {this.props.items.map((item: ISelectorItem) => 
                                { return <div key={item.id} onClick={() => this.props.setFilter(undefined, item.value)} className={item.value === this.props.placeholder ? "selector-list__item selector-list__item_active" : "selector-list__item"}>{item.value}</div> })}
                            </div>
                             : 'Список пуст'} </div>
                    : null }
            </div>
        );
    }
}

export default Selector;
