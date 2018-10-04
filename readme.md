Elasticsearch queries: 

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

---------------------------------------------
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
-------------------------------------------
POST to http://127.0.0.1:9200/metadata/my_type
-------------------------------------------
search query
GET /metadata/my_type/_search
{
  "query": {
    "match": {
      "name": "Brown " 
    }
  }
}
-------------------------------------------