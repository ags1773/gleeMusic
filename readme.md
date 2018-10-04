### GleeMusic
Uses
* File System for storing music files
* elasticSearch as DB for storing metadata
* elasticSearch for search suggestions
* Express server
* EJS templating engine
* Bootstrap (because I'm lazy)

How to run the app:
* elasticSearch needs to be installed and running on port 9200 with '/metadata' index created (refer below queries for set-up)
* npm install
* npm start

---
## Queries for setting up '/metadata' index in elasticSearch
#### setup analyzer
```sh
PUT /metadata
{
    "settings": {
        "number_of_shards": 1, 
        "analysis": {
            "filter": {
                "autocomplete_filter": {
                    "type":     "edge_ngram",
                    "min_gram": 3,
                    "max_gram": 20
                }
            },
            "analyzer": {
                "autocomplete": {
                    "type":      "custom",
                    "tokenizer": "standard",
                    "filter": [
                        "lowercase",
                        "autocomplete_filter" 
                    ]
                }
            }
        }
    }
}
```
#### setup mapping
```sh
PUT /metadata/_mapping/my_type
{
    "my_type": {
        "properties": {
          
          
          "encoding": {
            "type": "text",
            "fields": {
              "keyword": {
                "type": "keyword",
                "ignore_above": 256
              }
            }
          },
          "fileName": {
            "type": "text",
            "fields": {
              "keyword": {
                "type": "keyword",
                "ignore_above": 256
              }
            }
          },
          "mimeType": {
            "type": "text",
            "fields": {
              "keyword": {
                "type": "keyword",
                "ignore_above": 256
              }
            }
          },
          "originalName": {
            "type": "text",
            "analyzer": "autocomplete",
            "fields": {
              "keyword": {
                "type": "keyword",
                "ignore_above": 256
              }
            }
          },
          "path": {
            "type": "text",
            "fields": {
              "keyword": {
                "type": "keyword",
                "ignore_above": 256
              }
            }
          },
          "size": {
            "type": "long"
          }
        }
    }
}
```
#### Send POST request for indexing new data on 
```sh
http://127.0.0.1:9200/metadata/my_type
```
#### Sample search query
```sh
GET /metadata/my_type/_search
{
  "query": {
    "match": {
      "name": "Brown " 
    }
  }
}
```