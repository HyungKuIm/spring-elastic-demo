package com.oraclejava.es.api.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.oraclejava.es.api.model.Movie;
import com.oraclejava.es.api.repository.MovieRepository;

@RestController
public class MovieRestController {

	@Autowired
	private MovieRepository movieRepository;
	
	@PostMapping(value="/saveMovie", produces = MediaType.APPLICATION_JSON_VALUE,
				consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public int saveMovie(@RequestPart("movie") Movie movie, @RequestPart(value="img", required = false) MultipartFile img) {


		movie.setId((movie.getId() != null)?movie.getId():UUID.randomUUID().toString());
		if (img != null && !img.isEmpty()) {
			try {
				movie.setMoviePicture(img.getBytes());
			} catch (IOException e) {
				throw new RuntimeException(e);
			}
		}

		movieRepository.save(movie);
		return 1;
	}
	
	@DeleteMapping("/deleteMovie/{id}")
	public String deleteMovie(@PathVariable String id) {
		movieRepository.deleteById(id);
		return id;
	}
	
	@GetMapping({"/findAllMovies/{page}", "/findAllMovies"})
	public Iterable<Movie> findAllMovies(@PathVariable(required = false) Integer page) {
		page = (page == null) ? 1 : page;
		return movieRepository.findAll(PageRequest.of(page-1, 10, 
				Sort.by("title.keyword").and(Sort.by("price"))));
	}
	
	@GetMapping({"/findByTitle/{title}","/findByTitle/{title}/{page}"})
	public Iterable<Movie> findByTitle(@PathVariable String title, @PathVariable(required = false) Integer page) {
		page = (page == null) ? 1 : page;
		return movieRepository.findByTitle(title,PageRequest.of(page-1, 10, Sort.by("title.keyword")));
	}
	
	@GetMapping("/detailMovie/{id}")
	public Movie detail(@PathVariable String id) {
		//System.out.println(id);
		return movieRepository.findById(id).get();
	}
	
	@GetMapping("/download/{id}")
	public ResponseEntity<byte[]> download(@PathVariable String id) {
		Movie movie = movieRepository.findById(id).get();
		byte[] isr = movie.getMoviePicture();
		if (isr != null) {
			String fileName = id + ".jpg";
			HttpHeaders respHeaders = new HttpHeaders();
			respHeaders.setContentLength(isr.length);
			respHeaders.setContentType(new MediaType("jpeg", "jpg"));
			respHeaders.setCacheControl("must-revalidate, post-check=0, pre-check=0");
			respHeaders.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName);
		
			return new ResponseEntity<byte[]>(isr, respHeaders, HttpStatus.OK);
		} else {
			return null;
		}
	}
}









