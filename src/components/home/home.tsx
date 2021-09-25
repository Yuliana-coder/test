import React from "react";
import "./home.css"
import {data} from "./../../backend/data.js"

class Home extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state  = {
            cards: [],
            isLoaded: false,
            error: null
        }
    }

    dataAdapter(data: any) {
        return [...data].map((item: any) => {
            return {
                logo: item.organization && item.organization.logo ? item.organization.logo : "",
                rateFrom: item.rate && item.rate.periods && item.rate.periods[0] && item.rate.periods[0].rate && item.rate.periods[0].rate.from ? item.rate.periods[0].rate.from : 0,
                name: item.name || "",
                creditAmountFrom: item.rate && item.rate.creditAmount && item.rate.creditAmount.from ? item.rate.creditAmount.from : 0,
                creditAmountTo: item.rate && item.rate.creditAmount && item.rate.creditAmount.to ? item.rate.creditAmount.to : 0,
                termTo: item.rate && item.rate.periods && item.rate.periods[0] && item.rate.periods[0].term ? item.rate.periods[0].term.to : 0,
                ageFrom: item.customerRequirements && item.customerRequirements.age ? item.customerRequirements.age : 0,
                lastExperience: item.customerRequirements && item.customerRequirements.lastExperience ? item.customerRequirements.lastExperience : 0,
                documents: item.customerRequirements && item.customerRequirements.documents ? item.customerRequirements.documents : 0,
                license: item.organization && item.organization.license ? item.organization.license : ""
            }
        })
    }

    componentDidMount() {
        if(data) {
            this.setState({
                cards: this.dataAdapter(data),
                isLoaded: true
            })
            console.log(data);
        }else {
            this.setState({
                error: 'Ошибка получения данных',
                isLoaded: true
            })
        }
    }

    render() {
        const {cards, isLoaded, error} = this.state;
        if(error) {
            return (
                <div className="home">
                    <p>Ошибка {error.message}</p>
                </div>
            )
        }else if(!isLoaded) {
            return (
                <div className="home">
                    <p>Данные загружаются...</p>\
                </div>
            )
        }else {
            return (
                    <div className="home">
                        {cards.map((item: any) => { return <div>
                            <div>
                            {item.name}
                            </div>
                        </div>})}
                </div>
            );
        }
    }
}


export default Home;
