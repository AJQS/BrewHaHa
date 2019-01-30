import React from "react";
import { Box, Text, Heading, Image, Button } from "gestalt";
import { getToken, clearToken, clearCart } from "../utils";
import { NavLink, withRouter } from "react-router-dom";

class Navbar extends React.Component {
  handleSignout = () => {
    clearToken();
    clearCart();
    this.props.history.push("/");
  };

  render() {
    return getToken() !== null ? (
      <AuthNav handleSignout={this.handleSignout} />
    ) : (
      <UnAuthNav />
    );
  }
}

//NAVBAR TO SHOW WHEN USER IS LOGGED IN
const AuthNav = ({ handleSignout }) => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="around"
    height={70}
    color="#cc9900"
    padding={1}
    shape="roundedBottom"
  >
    {/* Checkout Link */}
    <NavLink activeClassName="active" to="/checkout">
      <Text size="xl" color="midnight" >
        <b>Checkout</b>
      </Text>
    </NavLink>

    {/* Title and Logo */}
    <NavLink activeClassName="active" exact to="/">
      <Box display="flex" alignItems="center">
        <Box margin={2} height={50} width={50}>
          <Image
            alt="BrewHaha Logo"
            naturalHeight={1}
            naturalWidth={1}
            src="./icons/logo.svg"
          />
        </Box>
        {/* Title */}
        <div className="main-title">
        <Heading size="xs" color="orchid">
          BrewSkies
        </Heading>
        </div>
      </Box>
    </NavLink>

    {/* Signout Button */}
    <Button
      onClick={handleSignout}
      color="gray"
      text="Sign Out"
      inline
      size="md"
    />
  </Box>
);

//NAVBAR TO SHOW WHEN USER NOT LOGGED
const UnAuthNav = () => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="around"
    height={70}
    color="#cc9900"
    padding={1}
    shape="roundedBottom"
  >
    {/* Sign In Link */}
    <NavLink activeClassName="active" to="/signin">
      <Text size="xl" color="midnight">
        Sign In
      </Text>
    </NavLink>

    {/* Title and Logo */}
    <NavLink activeClassName="active" exact to="/">
      <Box display="flex" alignItems="center">
        <Box margin={2} height={50} width={50}>
          <Image
            alt="BrewHaha Logo"
            naturalHeight={1}
            naturalWidth={1}
            src="./icons/logo.svg"
          />
        </Box>
        <div className="main-ttil">
        <Heading size="xs" color="orchid">
          BrewSkies
        </Heading>
        </div>
      </Box>
    </NavLink>

    {/* Sign Up Link */}
    <NavLink activeClassName="active" to="/signup">
      <Text size="xl" color="midnight">
        Sign Up
      </Text>
    </NavLink>
  </Box>
);

export default withRouter(Navbar);
