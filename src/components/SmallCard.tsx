import "../App.css";

const SmallCard = () => {
  return (
    <>
      <div className="small-card">
        <p className="header"> Feels like</p>
        <p className="value"> 18 o</p>
      </div>

      <div className="small-card">
        <p className="header">Humidity</p>
        <p className="value">46%</p>
      </div>

      <div className="small-card">
        <p className="header">Wind</p>
        <p className="value">14 km/h</p>
      </div>

      <div className="small-card">
        <p className="header">Precipitation</p>
        <p className="value">0 mm</p>
      </div>
    </>
  );
};

export default SmallCard;
