import { createMuiTheme } from '@material-ui/core/styles'
const theme = createMuiTheme({
    palette: {
        type: "dark",
        background: {
            default: "#1A1D24",
        },
        primary: {
            main: '#93bdec',
        },
        table: {
            main: "#2D2D2D",
            hover: "#333333"
        }
    },
})
export default theme