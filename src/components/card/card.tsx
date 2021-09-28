import "./card.css"
import {getYearsPhrase, getMonthsPhrase, getDocumentsPhrase} from "./../../utils/phrasing"
import {ICard} from "./../cardpage/cardpage"

 interface Props {
   card: ICard
 }

function Card(props: Props) {
  let rate: any = "";
  let creditAmount: any = "";
  let creditAmountMobile: any = "";

  if(props.card.rateFrom) {
    if(props.card.rateTo && props.card.rateFrom == props.card.rateTo) {
      rate = props.card.rateFrom + "%";
    }else {
      rate = "от " + props.card.rateFrom + "%";
    }
  }

  if(props.card.creditAmountFrom && props.card.creditAmountTo) {
    creditAmount = props.card.creditAmountFrom + " ₽" + " - " + props.card.creditAmountTo + " ₽";
    creditAmountMobile = "до " + (props.card.creditAmountTo / 1000000) + " млн ₽";
  }else if(props.card.creditAmountFrom) {
    creditAmount = props.card.creditAmountFrom + " ₽";
    creditAmountMobile = "от " + (props.card.creditAmountFrom / 1000000) + " млн ₽";
  }else if(props.card.creditAmountTo) {
    creditAmount = props.card.creditAmountTo + " ₽";
    creditAmountMobile = "до " + (props.card.creditAmountTo / 1000000) + " млн ₽";
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
            <div className="card__section_name">
              <div className="card__section-content">
                <div className="card__section-content-inner">
                  {props.card.name ? <span className="card__section-content-inner-text card__section-content-inner-text_name">"{props.card.name}"</span> : null}
                </div>
              </div>
            </div>
            {props.card.license ?
            <div className="card__section_license">
              <div className="card__section_license-line">
              </div>
              <div className="card__section_license-inner">
                лиц. № {props.card.license}
              </div>
            </div> : null}
            <div className="card__section">
              <div className="card__section-content">
                <div className="card__section-content-inner">
                  {rate ? <div className="card__section-content-inner-text-wrapper"> 
                  <div className="card__section-content-inner-text_inscription inscription">Ставка</div>
                  <span className="card__section-content-inner-text card__section-content-inner-text_rateFrom">
                    {rate}
                  </span> </div> : null}
                  <div className="card__section-content-inner-text-wrapper card__section-content-inner-text-wrapper_name">
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
                <div className="card__section-content-inner-text_inscription inscription">Сумма</div>
                  {creditAmount ? <span className="card__section-content-inner-text card__section-content-inner-text_amount"> {creditAmount} </span> : null}
                  {creditAmountMobile ? <span className="card__section-content-inner-text card__section-content-inner-text_amount-mobile"> {creditAmountMobile} </span> : null}
                  {props.card.termTo ? <span className="card__section-content-inner-text card__section-content-inner-text_term"> На срок до {Math.ceil(props.card.termTo / 12) } {getYearsPhrase(Math.ceil(props.card.termTo / 12))}</span> : null}
                </div>
              </div>
            </div>
            <div className="card__section">
              <div className="card__section-content">
                <div className="card__section-content-inner card__section-content-inner_conditions">
                  {props.card.ageFrom ? <span className="card__section-content-inner-text">Возраст от {props.card.ageFrom} {getYearsPhrase(props.card.ageFrom)}</span> : null}
                  {props.card.lastExperience ? <span className="card__section-content-inner-text">Стаж от {props.card.lastExperience} {getMonthsPhrase(props.card.lastExperience)}</span> : null}
                  {props.card.documents ? <span className="card__section-content-inner-text">{props.card.documents} {getDocumentsPhrase(props.card.documents)}</span> : null}
                </div>
              </div>
            </div>
            <div className="card__section">
              <div className="card__section-content-inner">
                {props.card.license ? <span className="card__section-content-inner-text card__section-content-inner-text_license">лиц. №{props.card.license}</span> : null}
                <div className="card__section-content-inner_btn">
                  <button onClick={() => window.open("/", 'target="_blank"')} className="btn-confirm">ПЕРЕЙТИ НА САЙТ</button>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }

export default Card;
