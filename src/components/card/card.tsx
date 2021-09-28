import "./card.css"
import {getYearsPhrase, getMonthsPhrase, getDocumentsPhrase} from "./../../utils/phrasing"

interface Card {
    id: number
    logo: string;
    rateFrom: number;
    rateTo: number;
    name: string;
    creditAmountFrom: number;
    creditAmountTo: number;
    termTo: number;
    ageFrom: number;
    lastExperience: number;
    documents: number;
    license: string;
 }

 interface Props {
   card: Card
 }

function Card(props: Props) {
  let rate: any = "";
  let creditAmount: any = "";

  if(props.card.rateFrom) {
    if(props.card.rateTo && props.card.rateFrom == props.card.rateTo) {
      rate = props.card.rateFrom + "%";
    }else {
      rate = "от " + props.card.rateFrom + "%";
    }
  }

  if(props.card.creditAmountFrom && props.card.creditAmountTo) {
    creditAmount = props.card.creditAmountFrom + " ₽" + " - " + props.card.creditAmountTo + " ₽";
  }else if(props.card.creditAmountFrom) {
    creditAmount = props.card.creditAmountFrom + " ₽";
  }else if(props.card.creditAmountTo) {
    creditAmount = props.card.creditAmountTo + " ₽";
  }

    return (
      <div className="card-wrapper">
         <div className="card">
            <div className="card__section">
              <div className="card__section-content">
                <div className="card__section-content-inner">
                  <div className={props.card.logo ? "card__section-content-inner-logo" : "logo-stub"}>
                    <div className="logo-container">
                      <img className="logo" src={props.card.logo ? props.card.logo : ""} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card__section">
              <div className="card__section-content">
                <div className="card__section-content-inner">
                  {rate ? <div className="card__section-content-inner-text-wrapper"> 
                  <span className="card__section-content-inner-text card__section-content-inner-text_rateFrom">
                    {rate}
                  </span> </div> : null}
                  <div className="card__section-content-inner-text-wrapper">
                    {props.card.name ? 
                    <div className="card__section-content-inner-text card__section-content-inner-text_name">"{props.card.name}"</div>
                    : null}
                  </div>
                </div> 
              </div>
            </div>
            <div className="card__section">
              <div className="card__section-content">
                <div className="card__section-content-inner">
                  {creditAmount ? <span className="card__section-content-inner-text card__section-content-inner-text_amount"> {creditAmount} </span> : null}
                  {props.card.termTo ? <span className="card__section-content-inner-text card__section-content-inner-text_term"> На срок до {Math.ceil(props.card.termTo / 12) } {getYearsPhrase(Math.ceil(props.card.termTo / 12))}</span> : null}
                </div>
              </div>
            </div>
            <div className="card__section">
              <div className="card__section-content">
                <div className="card__section-content-inner">
                  {props.card.ageFrom ? <span className="card__section-content-inner-text">Возраст от {props.card.ageFrom} {getYearsPhrase(props.card.ageFrom)}</span> : null}
                  {props.card.lastExperience ? <span className="card__section-content-inner-text">Стаж от {props.card.lastExperience} {getMonthsPhrase(props.card.lastExperience)}</span> : null}
                  {props.card.documents ? <span className="card__section-content-inner-text">{props.card.documents} {getDocumentsPhrase(props.card.documents)}</span> : null}
                </div>
              </div>
            </div>
            <div className="card__section">
              <div className="card__section-content">
                <div className="card__section-content-inner">
                  {props.card.license ? <span className="card__section-content-inner-text card__section-content-inner-text_license">лиц. №{props.card.license}</span> : null}
                  <div className="card__section-content-inner_btn">
                    <a className="" href="/" target="_blank"><button className="btn-confirm">ПЕРЕЙТИ НА САЙТ</button></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }

export default Card;
