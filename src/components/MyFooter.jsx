import { Component } from "react";

class MyFooter extends Component {
  render() {
    return (
      <footer>
        <span className="text-muted">Epiweather {new Date().getFullYear()}©</span>
      </footer>
    );
  }
}

export default MyFooter;
