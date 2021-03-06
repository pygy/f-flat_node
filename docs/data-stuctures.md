# Data Structures

## Lists

Lists / Arrays are surrounded by square (`[]`) or round (`()`) brackets with optinally comma-separated elements.  The difference being that expressions within round brackets are executed immediately.

```
f♭> ( 1 2 )
[ [ 1 2 ] ]

f♭> ( 3, 4 )
[ [ 1 2 ] [ 3 4 ] ]

f♭> ( 5 6 * )
[ [ 1 2 ] [ 3 4 ] [ 30 ] ]

f♭> [ 1 2 * ]
[ [ 1 2 ] [ 3 4 ] [ 30 ] [ 1 2 * ] ]
```

## Maps

Maps (aka objects or records) are surrounded by curly brackets (`{}`) with optinally comma-separated elements.  The key in a key value pair is actullay a word as described above.  Expressions within curly brackets are executed immediately.

```
f♭> { x: 1 y: 2 }
[ { x: 1 y: 2 } ]

f♭> { z: 3, u: 4 5 * }
[ { x: 1 y: 2 } { z: 3 u: 20 } ]

f♭> { 'v' : 3 , 'w' : 4 }
[ { x: 1 y: 2 } { z: 3 u: 20 } { v: 3 w: 4 } ]
```

