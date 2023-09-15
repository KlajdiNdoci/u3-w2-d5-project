import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound = props => {
  return (
    <div className={`text-center ${props.spacings}`}>
      <h1 className="display-4">{props.mainText}</h1>
      <p>
        The resource you're looking for does not exist, <Link to="/">Go back.</Link>
      </p>

      <Link to="/">
        <Button variant={props.btnVariant || "secondary"}>Return to the homepage</Button>
      </Link>
    </div>
  );
};
export default NotFound;
