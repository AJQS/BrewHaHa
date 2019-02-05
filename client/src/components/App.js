//To launch strapi server
// cd server
// strapi start
// look in terminal for strapi admin panel server info - click to follow
// new terminal
// cd client
// npm start
// in browser, http://localhost:1337/graphql for graphql playground
// ---

import React, { Component } from "react";
// eslint-disable-next-line
import { Container, Box, Heading, Card, Image, Text, SearchField, Icon } from "gestalt";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import "./App.css";
import Strapi from "strapi-sdk-javascript/build/main";
const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);

//stupid save
class App extends Component {
  state = {
    brands: [],
    searchTerm: "",
    loadingBrands: true
  };

  async componentDidMount() {
    try {
      const response = await strapi.request("POST", "/graphql", {
        data: {
          query: `query {
            brands {
              _id
              name
              description
              image {
                url
              }
            }
          }`
        }
      });
      // console.log(response);
      this.setState({ brands: response.data.brands, loadingBrands: false });
    } catch (err) {
      console.error(err);
      this.setState({ loadingBrands: false });
    }
  }

  handleChange = ({ value }) => {
    this.setState({ searchTerm: value }, () => this.searchBrands());
  };

  // filteredBrands = ({ searchTerm, brands }) => {
  //   return brands.filter(brand => {
  //       //this checks if the there is a match in the brand name AND the brand description to what
  //   //the user has typed in the search bar
  //     return (
  //       brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       brand.description.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //   });
  // };

  //SEARCH FOR BRAND NAMES
  //Get search to return values in the graphql format below
  searchBrands = async () => {
    const response = await strapi.request('POST', '/graphql', {
      data: {
        query: `query	{
          brands(where: {
            name_contains: "${this.state.searchTerm}"
          }){
            _id
            name
            description
            image {
              url
            }
          }
        }`
      }
    });
    console.log(this.state.searchTerm, response.data.brands);
    this.setState({
      brands: response.data.brands,
      loadingBrands: false
    });
  }

  render() {
    const { searchTerm, loadingBrands, brands } = this.state;

    return (
      <Container>
        {/* Brands Search Field */}
        <Box display="flex" justifyContent="center" marginTop={4}>
          <SearchField
            id="searchField"
            accessibilityLabel="Brands Search Field"
            onChange={this.handleChange}
            value={searchTerm}
            placeholder="Search Brands"
          />
          <Box margin={3}>
            <Icon
              icon="filter"
              color={searchTerm ? "orange" : "gray"}
              size={20}
              accessibilityLabel="Filter"
            />
          </Box>
        </Box>

        {/* Brands Section */}
        <Box display="flex" justifyContent="center" marginBottom={2}>
          {/* Brands Header */}
          <Heading color="midnight" size="md">
            Brew Brands
          </Heading>
        </Box>
        {/* Brands */}
        <Box
          dangerouslySetInlineStyle={{
            __style: {
              backgroundColor: "#e6e6ff"
            }
          }}
          shape="rounded"
          wrap
          display="flex"
          justifyContent="around"
        >
        {/* // map the data of the user's search based on matching letters of
        // their text and brand names */}
          {brands.map(brand => (
            <Box paddingY={4} margin={2} width={200} key={brand._id}>
              <Card
                image={
                  <Box height={200} width={200}>
                    <Image
                      fit="cover"
                      alt="Brand"
                      naturalHeight={1}
                      naturalWidth={1}
                      src={`${apiUrl}${brand.image.url}`}
                    />
                  </Box>
                }
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  direction="column"
                >
                  <Text bold size="xl">
                    {brand.name}
                  </Text>
                  <Text>{brand.description}</Text>
                  <Text bold size="xl">
                    <Link to={`/${brand._id}`}>See Brews</Link>
                  </Text>
                </Box>
              </Card>
            </Box>
          ))}
        </Box>
        {/* <Spinner show={loadingBrands} accessibilityLabel="Loading Spinner" /> */}
        <Loader show={loadingBrands} />
      </Container>
    );
  }
}

export default App;
