import React, { Component } from 'react';
//prettier-ignore
// eslint-disable-next-line
import { Container, Box, Heading, Card, Image, Text, SearchField, Icon, Spinner} from 'gestalt';
import { Link } from 'react-router-dom';
import Loader from './Loader'
import './App.css';
import Strapi from 'strapi-sdk-javascript/build/main';
const apiUrl = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiUrl);

class App extends Component {
  state = {
    brands:[],
    searchTerm: "",
    loadingBrands: true
  };
  async componentDidMount(){
    try {
      const response = await strapi.request('POST', '/graphql', {
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
    
    })
      //console.log(response);
      this.setState({brands: response.data.brands, loadingBrands: false})
  } catch (err) {
    console.error(err);
    this.setState({ loadingBrands: false });
  }
}

handleChange = ({ value }) => {
  this.setState({ searchTerm: value });
};

filteredBrands = ({ searchTerm, brands}) => {
  return brands.filter(brand => {
    //this checks if the there is a match in the brand name AND the brand description to what
    //the user has typed in the search bar
    return brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    brand.description.toLowerCase().includes(searchTerm.toLowerCase());
  })
};

  render() {
    const {searchTerm, loadingBrands} = this.state;

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
            color={searchTerm ? 'orange' : 'gray'}
            size={20}
            accessibilityLabel="Filter"
          />

        </Box>
        </Box>
        

          {/*Brands Section*/}
          <Box display="flex" justifyContent="center" marginBottom={2}>
            {/*Brands Header*/}
             <Heading color="midnight" size="md">
               Brew Brands
              </Heading>
          </Box>
          {/* Brands */}
          <Box 
          dangerouslySetInlineStyle={{
            __style:{
              backgroundColor: '#d6c8ec'
            }
          }}
          shape="rounded"
          wrap display="flex" justifyContent="around">
            {this.filteredBrands(this.state).map(brand => (
              <Box paddingY={4} margin={2} width={200} keys={brand._id}>
                <Card
                  image={
                    <Box height={200} width={200}>
                      <Image
                        fit="cover"
                        alt = "Brand"
                        natualHeight={1}
                        naturalWidth={1}
                        src={`${apiUrl}${brand.image.url}`}
                      />
                    </Box>
                  }
                  > 
                  <Box display="flex" alignItems="center" justifyContent="center" direction="column">
                    <Text size="xl">{brand.name}</Text>
                    <Text>{brand.description}</Text>
                    <Text bold size="xl">
                      <Link to={`/${brand._id}`}>See Brews</Link>
                    </Text>
                  </Box>
                </Card>
              </Box>
            ))}
           </Box>
        {/* <Spinner show={loadingBrands} accessibilityLabel="Loading Spinner"/> */}
        <Loader show={loadingBrands} />
      </Container>
    );
  }
}

export default App;
