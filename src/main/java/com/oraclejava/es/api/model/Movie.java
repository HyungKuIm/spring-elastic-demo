package com.oraclejava.es.api.model;

import org.springframework.data.elasticsearch.annotations.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(indexName = "movies", type = "_doc", shards = 2)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Movie {
	private String id;
	private String title;
	private int price;
	private String synopsis;
	
	private byte[] moviePicture;
}
