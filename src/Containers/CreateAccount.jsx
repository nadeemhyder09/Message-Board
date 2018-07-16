import React, {Component} from 'react';
import SimpleBox from '../Components/SimpleBox';
import InputField from '../Components/InputField';
import FooterFormButton from '../Components/FooterFormButton';
import { createAccount} from '../Actions/UserActions';
import {connect} from 'react-redux';
import ErrorAlert from '../Components/ErrorAlert';
import {errStyle} from '../Helpers/ReduxFormValidation'

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confrimPassword: '',
      error: ''
    }
  }

  isValid() {
    const {email, password, confrimPassword} = this.state;
    if (email === '' || password === '' || confrimPassword === '') {
      this.setState({
        error: "Please Enter all required Fields"
      })
      return false
    }
    if (password !== confrimPassword) {
      this.setState({
        error: "Please make sure your Password Match"
      })
      return false
    }
    return true
  }

  submitAccount(event) {
    event.preventDefault();
    if (!this.isValid()) {
      return
    }
    this.props.createAccount(this.state.email, this.state.password).then(() => 
      {this.props.history.replace("/")}).catch(error => {this.setState({
        error: error.message
      })
    });

  }

  renderBody() {
    return(
        <div className="text-center">
            <form onSubmit={(event) => {this.submitAccount(event)}}>
              <InputField id="email" type="text" label="Email"
              inputAction={(event) => this.setState({email: event.target.value})}
              style={this.state.error ? errStyle : null}
              />
              <InputField id="password" type="password" label="Password"
              inputAction={(event) => this.setState({password: event.target.value})}
              style={this.state.error ? errStyle : null}
              />
               <InputField id="confirm-password" type="password" label="Confirm Password"
              inputAction={(event) => this.setState({confrimPassword: event.target.value})}
              style={this.state.error ? errStyle : null} 
              />
              <FooterFormButton submitLabel="Create Account" otherLabel="Go Back" 
                goToLink="/Login" {...this.props}/>
              {this.state.error && <ErrorAlert>{this.state.error}</ErrorAlert>}
          </form>
        </div>
      )
  }
  render() {
    return(
        <SimpleBox body={this.renderBody()} title="Create Account" />
      )
  }
}

export default connect(null, {createAccount})(CreateAccount);