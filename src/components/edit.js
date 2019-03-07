import React, {Component} from 'react';

class Edit extends Component {
    render() {
        return (
            <div style={{display: this.props.editDisable ? "none" : "block"}}>
                <p><b>Edit {this.props.editId} Employee Name</b></p>
                <p>Name: <input type="text" value={this.props.editName} placeholder="Enter Name" onChange={this.props.editNameValues}/></p>
                <button onClick={() => this.props.editValues(this.props.editId)}>Submit</button>
            </div>
        )
    }
}

export default Edit;