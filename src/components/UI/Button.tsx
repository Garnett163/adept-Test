import './Button.css';

type IButton = {
  name?: string;
  className?: string;
  handleButtonClick: () => void;
};

function Button({ name, handleButtonClick, className }: IButton) {
  return (
    <button onClick={handleButtonClick} className={`button ${className ? className : ''}`}>
      {name}
    </button>
  );
}

export default Button;
