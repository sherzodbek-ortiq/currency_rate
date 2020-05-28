import React from "react"
import { ActionCableProvider } from "react-actioncable-provider";
//import registerServiceWorker from './registerServiceWorker';
import { API_WS_ROOT } from '../custom_components';
import Rate from './Rate';

class Rates extends React.Component {

	render(){
    return (
			<ActionCableProvider url={API_WS_ROOT}>
				<Rate />
			</ActionCableProvider>
    );
	}
}

export default Rates

//registerServiceWorker();