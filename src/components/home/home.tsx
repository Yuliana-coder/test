import React from "react";
import "./home.css"
import Card from "./../card";
import Selector from "./../selector";
import {SORTING_DICTIONARY, PURPOSES_DICTIONARY} from "./../../backend/data.js"
import { Link } from 'react-router-dom'
import {getCardsData, getTotalNumberCards} from "./../../backend/api"

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
            },
            sortField: "rateFrom",
            filters: {
                name: "",
                amount: null
            },
            isOpenSelector: false
        }
    }

    onChange=()=>{
        this.setState({isOpenSelector : !this.state.isOpenSelector});
      }

    getData() {
        const filters: any = Object.keys(this.state.filters).filter((item: any) => { return item }).map((item1: any) => { return {[item1]: this.state.filters[item1]} });
        this.setState({cards: getCardsData(undefined, this.state.pagination.currentNumberItems,this.state.sortField, filters).data},
        () => {
            if(this.state.cards && this.state.cards.length) {
                this.setState({isLoaded: true, error: '',});
            }else {
                this.setState({
                    error: 'Ошибка получения данных',
                    isLoaded: true
                })
            }
        }
        );
        this.setState((prevState: any) => ({
            pagination: {                   
                ...prevState.pagination,   
                totalNumberItems: getCardsData(undefined, this.state.pagination.currentNumberItems,this.state.sortField, filters).totalNumber
            }
        }));
    }

    setSort(field: any) {
        localStorage.setItem('sorting', this.state.sortField);
        this.setState({sortField: field}, this.getData);
    }

    setFilter(filterKey: any, value: any) {
        this.state.filters[filterKey] = value;
        this.getData();
    }

    componentDidMount() {
        this.getData();
        localStorage.setItem('sorting', this.state.sortField);
    }

    getFilterFormat(dictionary: any) {
        return dictionary.map((item: any) => {
            return {
                id: dictionary.indexOf(item),
                value: item
            }
        })
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

    closeSelector() {
        this.setState({isOpenSelector: false});
        console.log('llll');
    }

    changeOpenSelector(){
        this.setState({isOpenSelector: !this.state.isOpenSelector});
    }

    render() {
        const {cards, isLoaded, error, pagination, sortField, filters, isOpenSelector} = this.state;
        
        if(error) {
            return (
                <div className="home">
                    <div className="home-cards-filters">
                        {isOpenSelector}
                        {PURPOSES_DICTIONARY ?
                        <div className="home-cards-filters__item">
                            <Selector closeSelector={this.closeSelector.bind(this)} default='Любая' key={'name'} isOpen={isOpenSelector} setFilter={(filterKey: any, value: any) => this.setFilter('name', value)}  changeOpenSelector={() => this.changeOpenSelector()} placeholder={ filters.name ? filters.name : "Любая"} items={this.getFilterFormat(PURPOSES_DICTIONARY)} currentItem={filters.name} />
                        </div> : null}
                    </div> 
                    <p>Ничего не найдено {error.message}</p>
                </div>
            )
        }else if(!isLoaded) {
            return (
                <div className="home">
                    <p>Данные загружаются...</p>
                </div>
            )
        }else {
            return (
                    <div className="home">
                        <div className="home-cards-filters">
                            {isOpenSelector}
                            {PURPOSES_DICTIONARY ?
                            <div className="home-cards-filters__item">
                                <Selector closeSelector={this.closeSelector.bind(this)} default='Любая'  key={'name'} isOpen={isOpenSelector} setFilter={(filterKey: any, value: any) => this.setFilter('name', value)}  changeOpenSelector={() => this.changeOpenSelector()} placeholder={ filters.name ? filters.name : "Любая"} items={this.getFilterFormat(PURPOSES_DICTIONARY)} currentItem={filters.name} />
                            </div> : null}
                        </div> 
                        {cards && cards.length ? 
                        <div className="home-cards">
                        <div className="home-cards-sort">
                            <div className="home-cards-sort__item_text">
                                Сортировать:
                            </div>
                            {SORTING_DICTIONARY && SORTING_DICTIONARY.length ?
                            SORTING_DICTIONARY.map((item: any) => {
                                return <div key={SORTING_DICTIONARY.indexOf(item)} className="home-cards-sort__item">
                                    <button className={`home-cards-sort__item-btn ${sortField === item.field ? 'home-cards-sort__item-btn_disabled' : null}`} disabled={sortField === item.field} onClick={() => this.setSort(item.field)}>
                                        {item.text} 
                                    </button>
                                </div>
                            }) : null}
                        </div>
                        {cards.map((item: any) => { return <div key={item.id}>
                        <Link target="_blank" to={`/card/${item.id}`}>
                            <div className="home-card">
                            <Card card={item} />
                            </div>
                        </Link> </div>})} </div> : "Список пуст"}
                        {pagination.totalNumberItems > pagination.currentNumberItems ? 
                        <div onClick={this.paginatePage.bind(this)} className="home__pagination">
                            <div className="home__pagination-inner">
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
