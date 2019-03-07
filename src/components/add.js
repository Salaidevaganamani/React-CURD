import React, {Component} from 'react';

class Add extends Component {
    render() {
        return(
            <div style={{display: this.props.submitDisable ? "none" : "block"}}>
                <p><b>Add New Employee Name</b></p>
                <p>Name: <input type="text" value={this.props.name} placeholder="Enter Name" onChange={this.props.nameValues}/></p>
                <button onClick={this.props.submitValues}>Submit</button>
            </div>
        )
    }
}

export default Add;