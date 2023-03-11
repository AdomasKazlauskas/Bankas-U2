const Button = ({ label, onClick, disabled, type = "button" }) => {
  return (
    <button
      className="some-button"
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {label}
    </button>
  );
};

export default Button;
