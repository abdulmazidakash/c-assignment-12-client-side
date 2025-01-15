import useAxiosPublic from "../hooks/useAxiosPublic";

const axiosPublic = useAxiosPublic();

export const imageUpload = async imageData =>{
	
	const formData = new FormData();
	formData.append('image', imageData)
	const {data} = await axiosPublic.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData)


	return data.data.display_url;
}


export const saveUser = async user =>{
	await axiosPublic.post(`${import.meta.env.VITE_API_URL}/users/${user.email}`, {
		name: user.displayName,
		image: user.photoURL,
		email: user.email,
	  });
}

export const shortImageName = (image, length = 10) =>{

	if(!image || typeof image?.name !== 'string') return 'Choose Image'

	if(image?.name.length <= 15) return image?.name
	return image?.name
		.substring(0, length)
		.concat(`...${image?.type.split('/')[1]}`)
}