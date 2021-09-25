interface Props {
    logo: string;
    rateFrom: number;
    name: string;
    creditAmountFrom: number;
    creditAmountTo: number;
    rateTo: number;
    ageFrom: number;
    lastExperience: number;
    documnts: number;
    license: string;
 }

function Card(props: Props) {
    const showMessage = () => {
      alert('Followed ' + props.name);
    };
  
    const handleClick = () => {
      setTimeout(showMessage, 3000);
    };
  
    return (
      <button onClick={handleClick}>Follow</button>
    );
  }

export default Card;
