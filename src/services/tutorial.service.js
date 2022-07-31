import http from "../http-common";
//rest api deki metotlarla direkt iletişim kurduğumuz yer

class TutorialDataService {


getAlTutorials() //http://85.159.71.66:8080/api/movies
{
  return http.get("/tutorials");
}

movieSave(data)
{
    
}
}
export default new TutorialDataService();