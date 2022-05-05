import Api from '../api/Api'

export  function fetchTaskList  ()  {
	 
	return async (dispatch) => {
		  const api = new Api()
		  await api.initialize()
		  
			api.fetchTaskList({ type: 'active' })
	      		.then((data) => {
	     			console.log({data})
	    	})
	}
}