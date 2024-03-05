import './Button.css';

type IButton = {
  name?: string;
  type?: 'submit' | 'reset' | 'button';
  className?: string;
  handleButtonClick?: () => void;
};

function Button({ name, handleButtonClick, className, type }: IButton) {
  return (
    <button onClick={handleButtonClick} className={`button ${className ? className : ''}`} type={type}>
      {name}
    </button>
  );
}

export default Button;
