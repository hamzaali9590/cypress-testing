import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        userName: '',
      password: ''
    };
  }

  handleUserNameChange = (event) => {
    this.setState({ userName: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

   fetchData = async (event) => {
       event.preventDefault();
        try{
            const response = await fetch ('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName: this.state.userName,
                    password: this.state.password
                })
            });
            if(response.ok){
                const result = await response.json();
                this.props.history.push('/dashboard');       
                console.log(result);
            }
            this.setState({userName: '', password: ''});
            console.log("User Name:", this.state.userName, "Password: ", this.state.password);

        }catch(err){
            console.log(err)
        }

  }
  

  render() {
    return (
      <div className="container">
        <div className="loginContainer">
        <form onSubmit={this.fetchData}>
            <input type="text" placeholder="User Name" value={this.state.userName} onChange={this.handleUserNameChange} className='inputUserNameField' /><br/><br/>

            <input type="password" placeholder="password" value={this.state.password} onChange={this.handlePasswordChange} className='inputPasswordField'/><br/><br/>
            <input type="submit" />
          </form>
 
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
