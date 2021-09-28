import React from "react";
import "./home.css"
import Card from "./../card";
import {data} from "./../../backend/data.js"
import { Link } from 'react-router-dom'
import {getCardsData} from "./../../backend/api"

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

    getData() {
        this.setState({cards: getCardsData(undefined, this.state.pagination.currentNumberItems)});
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
                            <Link target="_blank" to={`/card/${item.id}`}>
                                <div className="home-card">
                                <Card card={item} />
                                </div>
                            </Link>
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
