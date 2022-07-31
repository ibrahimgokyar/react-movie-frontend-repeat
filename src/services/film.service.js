import http from "../http-common";
//rest api deki metotlarla direkt iletişim kurduğumuz yer

class FilmDataService {

              //http-common.js              /
getAllFilms() //http://85.159.71.66:8080/api/movies
{
  return http.get("/movies");
}

movieSave(data)
{
   return http.post("/movies",data); //http://85.159.71.66:8080/api/movies
}

FilmAdinaGoreAra(aranacakKelime) //arama inputundan gelen kelime
{
     return http.get(`/movies?name=${aranacakKelime}`); //http://85.159.71.66:8080/api/movies?name=aranacakKelime
}

//http://85.159.71.66:8080/api/movies/2   // idsi 2 olan filmin detayını döner
IdyeGoreFilmDetayGetir(id)
{
    return  http.get(`/movies/${id}`);  //{"id": 2,"name": "Movie2 ", "genre": "Korku","releaseDate": "02.02.2022","image": "https://www.opendart.com/movie2.jpg"}
  
}

FilmSil(id)
{
  return  http.delete(`/movies/${id}`); 
}

movieGuncelle(id,data)
{
  return http.put(`/movies/${id}`,data);
}

}
export default new FilmDataService();