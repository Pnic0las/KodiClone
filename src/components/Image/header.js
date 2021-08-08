import React from 'react';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const style = {
    toolbar: {
     backgroundColor: '#4285f4',
     width: '100%'
    },
    underlineStyle: {
     borderColor: 'white'
    },
    hintStyle: {
     color: 'white'
    },
    inputStyle: {
     color: 'white'
    }
   }

export default class Header extends React.Component {
 render() {
  return (
   <Toolbar style={style.toolbar}>
    <ToolbarGroup>
     <TextField
        inputStyle={style.inputStyle}
        underlineStyle={style.underlineStyle}
        underlineFocusStyle={style.underlineStyle}
        hintStyle={style.hintStyle}
      hintText="Folder Path"
     />
     <RaisedButton>
      Browse
     </RaisedButton>
    </ToolbarGroup>
   </Toolbar>
  );
 }
}