interface Card {
    id: number
    logo: string;
    rateFrom: number;
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
    return (
      <div>
        <div>{props.card.id}</div>
      </div>
    );
  }

export default Card;
