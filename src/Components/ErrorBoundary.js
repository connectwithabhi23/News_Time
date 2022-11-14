import React, { Component } from 'react'

class ErrorBoundary extends Component {

    constructor(props) {
        super(props)
      
        this.state = {
          hasError:false
        }
      }

    static getDerivedStateFromError(error){

        return{
            hasError : true,
        }
    }
  render() {
    if(this.state.hasError){
        return <center><h2 style={{ color: "red" }}>Oops.....Something went wrong &#128542;</h2></center>
    }
    return(this.props.children)
      
    
  }
}

export default ErrorBoundary