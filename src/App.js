import React, { Component } from 'react';
import Add from "./components/add";
import Edit from "./components/edit";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      editName: '',
      datas: [],
      submitDisable: false,
      editDisable: true,
      editId: 0,
    }

    this.submitValues = this.submitValues.bind(this);
    this.deleteValue = this.deleteValue.bind(this);
    this.editValues = this.editValues.bind(this);
    this.nameValues = this.nameValues.bind(this);
    this.editNameValues = this.editNameValues.bind(this);
    this.fetchDataFromServer = this.fetchDataFromServer.bind(this);
  }

  componentDidMount() {
      this.fetchDataFromServer();
  }

  fetchDataFromServer = () => {
      fetch('http://localhost:3000/datas')
      .then((response) => {
        return response.json();
      })
      .then((myJs) => {
        this.setState({datas: myJs, name: '', editName: ''});
      });
  }
  nameValues = (e) => {
    this.setState({name: e.target.value})
    //console.log(this.state.name);
  }

  editNameValues = (e) => {
    this.setState({editName: e.target.value})
    //console.log(this.state.editName);
  }

  submitValues = () => {
    alert("Submited New " + this.state.name + " Employee");
    let obj = {name: this.state.name}
    fetch('http://localhost:3000/datas', {
                method: 'POST',
                headers : {"Content-Type": "application/json"},
                body:JSON.stringify(obj)
            }).then((res) => res.json())
            .then((data) =>  {
              this.fetchDataFromServer()
              console.log(data);
            })
            .catch((err)=>console.log(err))
  }

  deleteValue = (index) => {
    alert("Delete " + index + " Employee");
    fetch('http://localhost:3000/datas/' + index, {
                method: 'DELETE',
                headers : {"Content-Type": "application/json"}
            }).then((res) => res.json())
            .then((data) =>  {
              this.fetchDataFromServer()
            })
            .catch((err)=>console.log(err))
  }

  editValues = (index) => {
    alert("Edited " + index + " Employee");
    this.setState({submitDisable: false, editDisable: true, })
    let editobj = {name: this.state.editName}
    fetch('http://localhost:3000/datas/' + index, {
                method: 'PUT',
                headers : {"Content-Type": "application/json"},
                body:JSON.stringify(editobj)
              }).then((res) => res.json())
              .then((data) =>  {
                this.fetchDataFromServer()
                console.log(data);
              })
              .catch((err)=>console.log(err))
  }


  render() {
    const {datas} = this.state;
    return (
      <div className="App">
        <p><b>Employee Names</b></p>
        <table>
          <thead>
            <tr>
              <th>Emp ID</th>
              <th>Name</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody >
        {datas.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>
                <button onClick = {() => this.deleteValue(item.id)}>Delete</button>
                <button onClick = {() => {
                  this.setState({submitDisable: true, editDisable: false, editId: item.id, editName: item.name})
                }}>Edit</button>
              </td>
            </tr>
        ))}
        </tbody>
        </table>
        <Add
          submitDisable = {this.state.submitDisable}
          name = {this.state.name}
          nameValues = {this.nameValues}
          submitValues = {this.submitValues}
        />
        <Edit
          editDisable = {this.state.editDisable}
          editId = {this.state.editId}
          editName = {this.state.editName}
          editNameValues = {this.editNameValues}
          editValues = {this.editValues}
        />

      </div>
    );
  }
}

export default App;
