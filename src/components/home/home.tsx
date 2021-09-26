import React from "react";
import "./home.css"
import Card from "./../card";
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
                id: [...data].indexOf(item) + 1,
                logo: item.organization?.logo,
                rateFrom: item.rate?.periods[0]?.rate?.from,
                name: item.name,
                creditAmountFrom: item.rate?.creditAmount?.from,
                creditAmountTo: item.rate?.creditAmount?.to,
                termTo: item.rate?.periods[0]?.term?.to,
                ageFrom: item.customerRequirements?.age,
                lastExperience: item.customerRequirements?.lastExperience,
                documents: item.customerRequirements?.documents,
                license: item.organization?.license
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
                        {cards.map((item: any) => { return <div key={item.id}>
                            <div>
                            <Card card={item} />
                            </div>
                        </div>})}
                </div>
            );
        }
    }
}


export default Home;
