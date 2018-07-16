import React, {Component} from 'react';
import SimpleBox from '../Components/SimpleBox';
import InputField from '../Components/InputField';
import FooterFormButton from '../Components/FooterFormButton';
import {login, getUser, googleLogin, facebookLogin} from '../Actions/UserActions';
import {connect} from 'react-redux';
import ErrorAlert from '../Components/ErrorAlert';
import {errStyle} from '../Helpers/ReduxFormValidation';
import SocialMediaLogin from '../Components/SocialMediaLogin';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: ''
    }
  }

  componentWillMount() {
    if (this.props.user !== null) {
        this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== null) {
      nextProps.history.push('/');
    }
  }

  submitLogin(event) {
    event.preventDefault();
    this.props.login(this.state.email, this.state.password).catch(err => {
      this.setState({
        error: err
      })
    });
  }

  renderBody() {
    return(
        <form onSubmit={event => {this.submitLogin(event)}}>
          <div className="text-center">
            <InputField id="email" type="text" label="Email"
            inputAction={(event) => this.setState({email: event.target.value})}
            style={this.state.error ? errStyle : null} 
            />
            <InputField id="password" type="password" label="Password"
            inputAction={(event) => this.setState({password: event.target.value})}
            style={this.state.error ? errStyle : null}
            />
            <FooterFormButton submitLabel="Sign in" otherLabel="Create Account" 
              goToLink="/CreateAccount" {...this.props}/>
            <SocialMediaLogin {...this.props} />
          </div>
          {this.state.error && <ErrorAlert>Your Username/Password are not Valid</ErrorAlert>}
        </form>
      )
  }

  render() {
    
    return(
        <div>
          <SimpleBox title="Sign In" body={this.renderBody()} />
        </div>
      )
  }
}

function mapStateToProps(state) {
  return {user: state.user}
}

export default connect(mapStateToProps, {login, getUser, googleLogin, facebookLogin})(Login);
