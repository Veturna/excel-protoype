import React from "react";
import { headers, data} from "./book";


function clone(o) {
    return JSON.parse(JSON.stringify(o))
}

class Excel extends React.Component {
    constructor(props) {
        super()
        this.state = {
            data: props.initialData,
            sortby: null,
            descending: false,
}
        this.sort = this.sort.bind(this)
    }
    sort(e){
        const column = e.target.cellIndex
        const cloneData = clone(this.state.data)
        const descending = this.state.sortby === column && !this.state.descending

        cloneData.sort((a, b) => {
            if (a[column] === b[column]) {
                return 0
            }
            return descending
                ? a[column] < b[column]
                    ? 1
                    : -1
                : a[column] > b[column]
                    ? 1
                    : -1
        })

        this.setState({
            data: cloneData,
            sortby: column,
            descending: descending
        })
    }
    render() {
        return (
<table>
    <thead onClick={this.sort}>
        <tr>
            {this.props.headers.map((title, index) => {
            if (this.state.sortby === index) {
                title += this.state.descending ? " \u2191" : " \u2193"
            } return <th key={index}>{title}</th>
            })} 
        </tr>
    </thead>
    <tbody>
        {this.state.data.map((row, index) => <tr key={index}>{row.map((cell, index) => <td key={index}>{cell}</td>)}</tr>)}
    </tbody>
</table>
        )
    }
}

export default Excel