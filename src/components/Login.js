import React from "react";
import { API_ROOT, HEADERS } from "../constants";

class Login extends React.Component {
    state = {
        username: "",
        password: ""
    };

    login = e => {
        e.preventDefault();


        let params = {
            username: this.state.username,
            password: this.state.password
        };

        let url = `${API_ROOT}/login`
      
        fetch(url, {
          method: "POST",
          headers: HEADERS,
          // headers: { "content-type": "application/json" },
          body: JSON.stringify(params)
        })
          .then(res => res.json())
          .then(res => {
            // console.log(res)
            localStorage.setItem("token", res.token);
          });
    };

    render() {
        return (

            <nav>
               
                <form>
                    <input
                        name="username"
                        value={this.state.username}
                        onChange={e => this.setState({ username: e.target.value })}
                        placeholder="USERNAME"
                    />
                    <input
                        name="password"
                        value={this.state.password}
                        onChange={e => this.setState({ password: e.target.value })}
                        placeholder="PASSWORD"
                    />
                    <button onClick={this.login}>Login</button>
                </form>

              </nav>
          

        )
    } 
}

export default Login;