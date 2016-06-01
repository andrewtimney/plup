import React from 'react'
import _ from 'lodash'
import {ipcRenderer} from 'electron'

export class Images extends React.Component {
  constructor(props) {
    super(props);
    this.state = {imgs:[]};
  }
  componentWillMount(){
    ipcRenderer.on('done', ()=>{
      console.log('done');
    });
    ipcRenderer.on('log', (event, arg)=>{
      console.log('log', arg);
    });
    ipcRenderer.send('start');
  }
  thumbnailCreated(result){
    console.log('thumbnailCreated', result);
  }
  render(){
    var self = this;
    var imgs = [];
    var just = _.take(this.state.imgs, 100);
    
    just.forEach(function(e, i){
        imgs.push(<div key={i}>
          <img src="https://placehold.it/250x250" data-src={e.path} width="250" />
        </div>);
    });

    return <div>
      <div style={{display: "flex", flexWrap:"wrap"}}>
        {imgs}
      </div>
        <div>{this.state.imgs.length}</div>
        <div>Images here</div>
      </div>
  }
}
