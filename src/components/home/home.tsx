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
            error: null,
            pagination: {
                currentNumberItems: 10,
                numberItems: 10,
                totalNumberItems: null
            }
        }
    }

    dataAdapter(data: any) {
        let currentArray: any =[...data];
        
        if(currentArray.length >= this.state.pagination.currentNumberItems) {
            currentArray = currentArray.slice(0, this.state.pagination.currentNumberItems)
        }

        return currentArray.map((item: any) => {
            return {
                id: [...data].indexOf(item) + 1,
                logo: item.organization?.logo,
                rateFrom: item.rate?.periods[0]?.rate?.from,
                rateTo: item.rate?.periods[0]?.rate?.to,
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

    getData() {
        this.setState({cards: this.dataAdapter(data)});
    }

    componentDidMount() {
        if(data) {
            this.setState((prevState: any) => ({
                pagination: {                   
                    ...prevState.pagination,   
                    totalNumberItems: data.length   
                }
            }), this.getData);
            this.setState({isLoaded: true});

        }else {
            this.setState({
                error: 'Ошибка получения данных',
                isLoaded: true
            })
        }
    }

    paginatePage() {
        if(this.state.pagination.currentNumberItems < this.state.pagination.totalNumberItems) {
            if(this.state.pagination.totalNumberItems - this.state.pagination.currentNumberItems > 
                this.state.pagination.numberItems) {
                this.setState((prevState: any) => ({
                    pagination: {                   
                        ...prevState.pagination,   
                        currentNumberItems: this.state.pagination.currentNumberItems + this.state.pagination.numberItems     
                    }
                }), this.getData);
                }else {
                    this.setState((prevState: any) => ({
                        pagination: {                   
                            ...prevState.pagination,   
                            currentNumberItems: this.state.pagination.totalNumberItems   
                        }
                    }), this.getData);
            }
        }
    }

    render() {
        const {cards, isLoaded, error, pagination} = this.state;
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
                        {pagination.totalNumberItems > pagination.currentNumberItems ? 
                        <div className="home__pagination">
                            <div onClick={this.paginatePage.bind(this)} className="home__pagination-inner">
                                Показать ещё {pagination.totalNumberItems - pagination.currentNumberItems >= pagination.numberItems
                                ? pagination.numberItems : 
                                pagination.totalNumberItems - pagination.currentNumberItems} из {pagination.totalNumberItems - pagination.currentNumberItems}
                             </div>
                        </div>
                        : null}
                </div>
            );
        }
    }
}


export default Home;
