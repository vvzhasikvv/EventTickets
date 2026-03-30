import { Link } from "react-router-dom";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  to,
  type = "button",
  ...props
}) => {
  const className = `btn btn--${variant} btn--${size}`;
  if (to) {
    return (
      <Link className={className} to={to} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={className} type={type} {...props}>
      {children}
    </button>
  );
};

export default Button;
