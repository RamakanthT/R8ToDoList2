//4th child comoponent
//does only one feature

import React, {Component} from 'react';

export class VisibilityControl extends Component{

    render = () =>
        <div className="form-check">
            <input className="form-check-input" type="checkbox" 
            checked={this.props.isChecked}
            onChange={(e)=> this.props.callback(e.target.checked) }/>

            <label className="form-check-label" >
                show {this.props.description}
            </label>

            {/** used props to recieve data from parent component*/ }
        </div>

}