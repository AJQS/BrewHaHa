import React from 'react'
import { Container, Box, Button, Heading, Text, TextField } from 'gestalt'

class Signup extends React.Component {
    state = {
        username:'',
        email:'',
        password:'',
    };
    
    handleChange = ({ event, value }) => {
        event.persist();
        this.setState({ [event.target.name]: value });
    };

handleSubmit = event => {
    event.preventDefault();

    if (!this.isFormEmpty()) {
        console.log("submitted")
    }
};

isFormEmpty = ({username, email, password}) => {
    return !username || !email || !password;
};

    render(){
        return(
            <Container>
                <Box
                dangerouslySetInlineStyle={{
                    __style: {
                        backgroundColor: '#ebe2da'
                    }
                }}
                margin={4}
                padding={4}
                shape='rounded'
                display='flex'
                justifyContent='center'
                >
                {/* Sign up form */}
                <form style={{
                    display:'inlineStyle',
                    textAlign: 'center',
                    maxWidth: 450
                }}
                onSubmit={this.handleSubmit}
                >
                        <Box
                        marginBottom={2}
                        display='flex'
                        direction='column'
                        alignItems='center'
                        >
                            <Heading color='midnight'>Let's Get Started</Heading>
                            <Text italic color='orchid'>Sign up to order some brews!</Text>
                        </Box>
                        {/* Username Input */}
                        <TextField
                            id="username"
                            type="text"
                            name="username"
                            placeholder="Username"
                            onChange={this.handleChange}
                        />
                            {/* Email Address Input */}
                            <TextField
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            onChange={this.handleChange}
                        />
                          {/* Password Input */}
                          <TextField
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={this.handleChange}
                        />
                        <Button
                            inline
                            color="blue"
                            text="Submit"
                            type="submit"
                        />
                </form>
                </Box>
            </Container>
        )
    }
}

export default Signup;