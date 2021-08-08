import React from 'react';

const styles = {
 imagePreviewContainer: {
  display: 'flex',
  width: '100%',
  height: 'calc(100% - 206px)',
  justifyContent: 'center',
  alignItems: 'center'
 },
 image: {
  maxHeight: '80%',
  maxWidth: '80%'
 }
}

export default class ImagePreview extends React.Component {
    
render() {
const {src} = this.props;
return (
   <div style={styles.imagePreviewContainer}>
    <img
     style={styles.image}
     src={src} />
   </div>
  );
 }
}