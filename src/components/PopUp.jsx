const PopUp = ({ setShowPopUp, type }) => {
  const messages = {
    delete: "Sąskaita ištrinta!",
    create: "Sąskaita sukurta!",
  };

  // norint pakeist css pagal type

  return (
    <div className="popup-box">
      <div className="box">
        <button onClick={() => setShowPopUp(false)}>x</button>
        <div>
          <b>{messages[type]}</b>
          <p>Operacija sėkminga</p>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
