import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class ImageResults extends Component {
    state = {
        open: false, // this is from Material UI Dialog documentation
        currentImg: '' 
    }

    handleOpen = img => {
        this.setState({ open: true, currentImg: img });
    }

    handleClose = () => {
        this.setState({ open: false });
    }

  render() {
    let imageListContent;
    // const images = this.props.images;
    const { images } = this.props; // same as above

    if(images) { // if images coming from Search is not empty
      imageListContent = (
        <GridList cols={3} style={{ paddingLeft: '5px', paddingRight: '5px' }}>
          {images.map(img => (
            <GridTile 
                title={img.tags} // tags is from api result 
                key={img.id}
                subtitle={ // like an image description 
                  <span>
                    by <strong>{img.user}</strong>
                  </span>
                }
                actionIcon={
                  <IconButton onClick={() => this.handleOpen(img.largeImageURL)}>
                    <ZoomIn color="white" />
                  </IconButton>
                }
            >

              <img src={img.largeImageURL} alt="Image Not Available"/>
            </GridTile>
          ))}
        </GridList>
      )
    } else {
        imageListContent = null;
    }

    const actions = [
        <FlatButton label="Close" primary={true} onClick={this.handleClose} />
    ]

    return (
      <div>
        {imageListContent}
        <Dialog 
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <img src={this.state.currentImg} alt="" style={{ width: '100%' }} /> 
        </Dialog>
      </div>
    )
  }
}

export default ImageResults;