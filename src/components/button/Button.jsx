const Button = ({ children, style, onClick }) => {
  return (
    <button
      className="rounded-full max-w-48 min-w-36 text-white font-medium px-5 py-3"
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default Button;
