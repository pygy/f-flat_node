# Site War

```forth
'https://github.com/' read length

site-size: [ read length ] ;

site-war: [ dup [ [ site-size ] >> ] map all zip object ] ;

[ 'http://google.com/' 'https://github.com/' ] site-war
```