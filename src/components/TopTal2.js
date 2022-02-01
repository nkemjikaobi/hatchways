import React, { Component } from 'react';
import ctx from 'classnames'

export class TodoClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: "",
            itemList: []
        }
       
      }
      
      handleChange = (e) => {
        this.setState({
            item: e.target.value,
        })
      }

      handleAdd = () => {
          if (this.state.item !== "") {
              const newItem = {
                  item: this.state.item,
                  isDone: false
              }
              this.setState({
                  //itemList: (prev) => [...prev, {item: this.state.item, isDone: false}]
                  itemList: [...this.state.itemList, newItem],
                  item: ""
              })  
          }
      }

        handleItemClass = (index) => {
            console.log(index);
        const done = this.state.itemList.map(el => {
            if (el === this.state.itemList[index]) {
                el.isDone = !el.isDone;
            }
            return el;
        })
        this.setState({
            itemList: done
        })
    }
  render() {
    return (
        <>
            <div>
                <input type="text" onChange={this.handleChange} value={this.state.item} />
                <button onClick={this.handleAdd}>Add</button>
            </div>
            <p>
                {this.state.itemList.filter(el => el.isDone).length} completed from {" "}
                {this.state.itemList.length}
            </p>
            <ul>
                {this.state.itemList.map((itemCurrent, i) => (
                    <li
                       key={i}
                       onClick={() => this.handleItemClass(i)}
                       className={itemCurrent.isDone ? "isDone" : ""}
                    >
                       {itemCurrent.item} 
                    </li>
                ))}
            </ul>
        </>
    )
  }
}

export default TodoClass;