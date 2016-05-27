import React from 'react'
import { ImageFiles } from '../services/image-files'
import _ from 'lodash'
import { createThumbnailProcess } from '../services/thumbnail-service'

export class Images extends React.Component {
  constructor(props) {
    super(props);
    this.state = {imgs:[]};
  }
  componentWillMount(){
    var imgFiles = new ImageFiles();
    imgFiles.getNewAndOld()
        .then((images)=>{
            this.setState({imgs:images});
        });
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
        
        //createThumbnailProcess(e.path).then(self.thumbnailCreated.bind(self));
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
