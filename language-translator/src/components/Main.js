import React, { Component } from 'react'
import './Main.css'

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            right_text: "Text Appear Here...",
            left_text: ""
        };
        
        this.convertTextHandler = this.convertTextHandler.bind(this);

    }

    getText = (event) => {
        this.setState({
            left_text: event.target.value
        })
    }

    convertTextHandler = (e) => {
        var axios = require("axios").default;

        var options = {
            method: 'GET',
            url: 'https://systran-systran-platform-for-language-processing-v1.p.rapidapi.com/translation/text/translate',
            params: { source: 'en', target: 'hi', input: this.state.left_text },
            headers: {
                'x-rapidapi-key': 'a3ccfdf31amshf245e61a3b29682p156972jsnc59ad2a3411e',
                'x-rapidapi-host': 'systran-systran-platform-for-language-processing-v1.p.rapidapi.com'
            }
        };

        axios.request(options)
        .then(response => {
            this.setState({
                right_text: response.data.outputs[0].output
            })
            
        }).catch(error=>{
            console.error(error);
        });
        
        e.preventDefault();
    }
    render() {
        return (
            <div className="outer">
                <div className="left-side">
                    <form>
                        <div className="text-area-content">
                            <textarea className="text-area" onChange={this.getText} placeholder="Enter Your Text..."></textarea>
                        </div>
                        <div className="btn-content">
                            <button className="btn" onClick={this.convertTextHandler}>Convert</button>
                        </div>
                    </form>
                </div>
                <div className="right-side">
                    <h3 className="right-text">{this.state.right_text}</h3>
                </div>
            </div>
        )
    }
}
export default Main