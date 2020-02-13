export default {
    async fetchNews(){
        try{
            let response = await fetch( 'https://192.168.10.61:3000/news',
            );
            let responseJson = await response.json();
            console.log(responseJson);
            return responseJson;
        }catch(error){
            console.error(error);
        }
    }
}