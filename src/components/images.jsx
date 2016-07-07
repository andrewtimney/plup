import React from 'react'
import _ from 'lodash'
import {ipcRenderer} from 'electron'

export class Images extends React.Component {
  constructor(props) {
    super(props);
    this.state = {imgs:[]};
  }
  componentWillMount(){
    ipcRenderer.on('done', (event, pics)=>{
      console.log('done', pics);
      this.setState({imgs:pics});
      //ipcRenderer.send('thumb', pics[0].path);
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
          <img src={e.path} width="250" />
        </div>);

        ipcRenderer.send('thumb', e.path);
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
