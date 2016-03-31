import React from 'react'
import { ImageFiles } from '../services/image-files'
import _ from 'lodash'

export class Images extends React.Component {
  constructor(props) {
    super(props);
    this.state = { new: [], old: [] };
  }
  componentWillMount(){
    var imgFiles = new ImageFiles();
    var images = imgFiles.getNewAndOld();
    this.setState(images);
  }
  render(){

    var imgs = [];
    var just = _.take(this.state.new, 100);
    just.forEach(function(e, i){
      imgs.push(<div key={i}>
          <img src={e.path} width="250" />
        </div>);
    });

    return <div>
      <div style={{display: "flex"}}>
        {imgs}
      </div>
        <div>{this.state.new.length}</div>
        <div>Images here</div>
      </div>
  }
}
