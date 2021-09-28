import React from "react";
import "./cardpage.css"
import {data} from "./../../backend/data.js"
import {getYearsPhrase, getMonthsPhrase, getDocumentsPhrase} from "./../../utils/phrasing"
import {getCardsData} from "./../../backend/api"
import { Link } from 'react-router-dom'

export interface ICard {
    id: number
    logo?: string;
    rateFrom?: number;
    rateTo?: number;
    name?: string;
    creditAmountFrom?: number;
    creditAmountTo?: number;
    termFrom?: number;
    termTo?: number;
    ageFrom?: number;
    lastExperience?: number;
    documents?: number;
    license?: string;
    initialAmount?: number;
    organization?: string
 }

 interface ICardState {
     card: ICard,
     isLoaded: boolean,
     error: any,
     id: any
 }

class Cardpage extends React.Component<any, ICardState> {
    constructor(props: any) {
        super(props);
        this.state  = {
            card: {
                id: 0
            },
            isLoaded: false,
            error: null,
            id: this.props.match.params.id
        }
    }

    getData() {
        this.setState({card: getCardsData(this.state.id) && getCardsData(this.state.id).length ? getCardsData(this.state.id)[0] : null});
    }

    componentDidMount() {
        if(data) {
            this.getData();
            this.setState({isLoaded: true});
        }else {
            this.setState({
                error: 'Ошибка получения данных',
                isLoaded: true
            })
        }
    }

    render() {
        const {card, isLoaded, error} = this.state;
        let rate: any = "";
        let creditAmount: any = "";
        let term: any = "";

        if(card.rateFrom) {
            if(card.rateTo && card.rateFrom == card.rateTo) {
              rate = card.rateFrom + "%";
            }else {
              rate = "от " + card.rateFrom + "%";
            }
        }

        if(card.termFrom && card.termTo) {
            term = (card.termFrom / 12) + " " + getYearsPhrase(card.termFrom / 12) + " - " + (card.termTo / 12) + " " + getYearsPhrase(card.termTo / 12);
          }else if(card.termFrom) {
            term = (card.termFrom / 12) + " " + getYearsPhrase(card.termFrom / 12);
          }else if(card.termTo) {
            term = (card.termTo / 12) + " " + getYearsPhrase(card.termTo / 12);
          }

        if(card.creditAmountFrom && card.creditAmountTo) {
            creditAmount = card.creditAmountFrom + " ₽" + " - " + card.creditAmountTo + " ₽";
          }else if(card.creditAmountFrom) {
            creditAmount = card.creditAmountFrom + " ₽";
          }else if(card.creditAmountTo) {
            creditAmount = card.creditAmountTo + " ₽";
          }

        if(error) {
            return (
                <div className="cardpage">
                    <p>Ошибка {error.message}</p>
                </div>
            )
        }else if(!isLoaded) {
            return (
                <div className="cardpage">
                    <p>Данные загружаются...</p>\
                </div>
            )
        }else {
            return (
                    <div className="cardpage">
                        <div className="breadcrumbs-wrapper cardpage-breadcrumbs cardpage-container">
                            <Link to={`/`} className="breadcrumbs__item">
                                <div>
                                    Главная
                                </div>
                            </Link>
                            <div className="breadcrumbs__item">
                                {card.organization}
                            </div>
                        </div>
                        {card.name ? <div className="cardpage__title-wrapper cardpage-container">
                            <h1 className="cardpage__title">{card.name}</h1>
                        </div> : null}
                        <section className="cardpage-info">
                            <div className="cardpage-info__header cardpage-container">
                                <div className={card.logo ? "cardpage-info__header-logo" : "logo-stub"}>
                                    <div className="logo-container">
                                        <img className="logo" src={card.logo ? card.logo : ""} />
                                    </div>
                                </div>
                                {card.license ? 
                                <div className="cardpage-info__header-text">
                                   лиц. №{card.license}
                                </div>
                                : null}
                            </div>
                            <div className="cardpage-info-content cardpage-container">
                                {rate ? 
                                <div className="cardpage-info-content__item">
                                    <div className="cardpage-info-content__item-label">
                                        Процентная ставка
                                    </div>
                                    <div className="cardpage-info-content__item-text">
                                        {rate}
                                    </div>
                                </div> : null}
                                {creditAmount ? 
                                <div className="cardpage-info-content__item">
                                    <div className="cardpage-info-content__item-label">
                                        Суммая кредита
                                    </div>
                                    <div className="cardpage-info-content__item-text">
                                        {creditAmount}
                                    </div>
                                </div> : null}
                                {term ? 
                                <div className="cardpage-info-content__item">
                                    <div className="cardpage-info-content__item-label">
                                        Срок
                                    </div>
                                    <div className="cardpage-info-content__item-text">
                                        {term}
                                    </div>
                                </div> : null}
                                {card.initialAmount ? 
                                <div className="cardpage-info-content__item">
                                    <div className="cardpage-info-content__item-label">
                                        Первоначальный взнос
                                    </div>
                                    <div className="cardpage-info-content__item-text">
                                        от {card.initialAmount}%
                                    </div>
                                </div> : null}
                                {card.lastExperience ? 
                                <div className="cardpage-info-content__item">
                                    <div className="cardpage-info-content__item-label">
                                        Стаж работы на последнем месте 
                                    </div>
                                    <div className="cardpage-info-content__item-text">
                                        {card.lastExperience} {getMonthsPhrase(card.lastExperience)}
                                    </div>
                                </div> : null}
                                {card.ageFrom ? 
                                <div className="cardpage-info-content__item">
                                    <div className="cardpage-info-content__item-label">
                                        Возраст заемщика
                                    </div>
                                    <div className="cardpage-info-content__item-text">
                                        от {card.ageFrom} {getYearsPhrase(card.ageFrom)}
                                    </div>
                                </div> : null}
                            </div>
                            <div className="cardpage-btn-wrapper cardpage-container">
                                <div className="cardpage-btn">
                                    <button onClick={() => window.open("/", 'target="_blank"')} className="btn-confirm cardpage-btn_height">ПЕРЕЙТИ НА САЙТ</button>
                                </div>
                            </div>
                        </section>
                    </div>
            );
        }
    }
}


export default Cardpage;
