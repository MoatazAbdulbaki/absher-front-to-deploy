import axios from 'axios';


export const fetchApi = async (
	url: string,
	method: string,
	data: any,
	token?:string,
	isMulter?: boolean
) => {
	return axios({
		url: import.meta.env.VITE_API_ROOT + url,
		method,
		data,
		headers: {
			Authorization: `bearer ${token}` || '',
			'Content-Type': `${
				!isMulter ? 'application/json' : 'multipart/form-data'
			}`,
		},
	});
};
