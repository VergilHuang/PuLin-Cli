import React from 'react';

class cComponent extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			propertis : this.props.propertis
		}
		this.eventHandler = ::this.eventHandler;
	}

	eventHandler(e){
		//do something ...
	}

	render(){
		if(condition){
			return <template> condition1 </template>
		}else{
			return <template2> condition2 </template2>
		}
	}
}

export default cComponent;