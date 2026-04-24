package com.oraclejava.es.api.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import com.oraclejava.es.api.model.Movie;

public interface MovieRepository extends ElasticsearchRepository<Movie, String>{
	
	//List<Movie> findAll(Sort sort);
	Page<Movie> findAll(Pageable pageable);
	
	@Query("{\"bool\": {\r\n"
			+ "      \"should\": [\r\n"
			+ "        {\r\n"
			+ "          \"match\": {\r\n"
			+ "            \"title.nori\": \"?0\"\r\n"
			+ "          }\r\n"
			+ "        },\r\n"
			+ "        {\r\n"
			+ "          \"match\": {\r\n"
			+ "            \"synopsis.nori\": \"?0\"\r\n"
			+ "          }\r\n"
			+ "        }\r\n"
			+ "      ]\r\n"
			+ "    }}")
	//List<Movie> findByTitle(String title);
	Page<Movie> findByTitle(String title, Pageable pageable);
}
